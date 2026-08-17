import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as esbuild } from 'esbuild';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const NAMESPACE = 'ExopterDesignSystem_4c9fc9';

const posix = (path) => path.replaceAll('\\', '/');
const sha = (source) => createHash('sha256').update(source).digest('hex').slice(0, 12);
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;

async function components() {
  const entry = await readFile(resolve(ROOT, 'index.js'), 'utf8');
  return [...entry.matchAll(/export \{ (\w+) \} from '(.+?)';/g)].map((match) => ({
    name: match[1],
    sourcePath: posix(match[2].replace(/^\.\//, '')),
  }));
}

function reactGlobalPlugin() {
  return {
    name: 'react-global',
    setup(builder) {
      builder.onResolve({ filter: /^react$/ }, () => ({ path: 'react', namespace: 'react-global' }));
      builder.onLoad({ filter: /.*/, namespace: 'react-global' }, () => ({
        contents: 'const React = window.React; export default React;',
        loader: 'js',
      }));
    },
  };
}

async function compile(entryPoint, options = {}) {
  const result = await esbuild({
    entryPoints: [resolve(ROOT, entryPoint)],
    bundle: true,
    write: false,
    charset: 'utf8',
    legalComments: 'none',
    target: ['es2020'],
    ...options,
  });
  return result.outputFiles[0].text;
}

async function componentBundle(componentList) {
  const sourceHashes = {};
  for (const component of componentList) {
    sourceHashes[component.sourcePath] = sha(await readFile(resolve(ROOT, component.sourcePath)));
  }

  const metadata = {
    format: 4,
    namespace: NAMESPACE,
    components: componentList,
    sourceHashes,
    inlinedExternals: [],
  };
  const compiled = await compile('index.js', {
    format: 'iife',
    globalName: NAMESPACE,
    plugins: [reactGlobalPlugin()],
    footer: { js: `window.${NAMESPACE} = ${NAMESPACE};` },
  });
  return `/* @ds-bundle: ${JSON.stringify(metadata)} */\n${compiled}`;
}

async function esmBundle() {
  return compile('index.js', {
    format: 'esm',
    external: ['react'],
  });
}

function inferTokenKind(name, value, annotation) {
  if (annotation) return annotation;
  if (/shadow/.test(name)) return 'shadow';
  if (/radius/.test(name)) return 'radius';
  if (/^(--(?:ex-)?(?:space|sp-)|--fs-|--control-h|--bw-|--ex-page-width)/.test(name)) return 'spacing';
  if (/font|^--fw-|^--lh-|^--ls-|^--num-/.test(name)) return 'font';
  if (/^--(?:dur|ease)/.test(name)) return 'other';
  if (/^--(?:surface|text|border|state|accent|focus|link)|^--ex-(?!font|space|radius|shadow|page)/.test(name)) return 'color';
  if (/^(?:#|rgb|hsl)/.test(value)) return 'color';
  return 'other';
}

async function tokens() {
  const result = [];
  for (const cssPath of ['tokens/exopter-tokens.css', 'tokens/aliases.css']) {
    const source = await readFile(resolve(ROOT, cssPath), 'utf8');
    for (const block of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const scope = block[1].replace(/\/\*[\s\S]*?\*\//g, '').trim();
      for (const declaration of block[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);(?:\s*\/\*\s*@kind\s+([\w-]+)\s*\*\/)?/g)) {
        const [, name, rawValue, annotation] = declaration;
        const value = rawValue.trim();
        const token = {
          name,
          value,
          kind: inferTokenKind(name, value, annotation),
          definedIn: cssPath,
        };
        if (scope !== ':root') token.scope = scope;
        if (annotation) token.annotation = annotation;
        result.push(token);
      }
    }
  }
  return result;
}

async function fonts() {
  const source = await readFile(resolve(ROOT, 'tokens/fonts.css'), 'utf8');
  const result = [];
  for (const match of source.matchAll(/@font-face\s*\{([^{}]+)\}/g)) {
    const block = match[1];
    const family = block.match(/font-family:\s*"([^"]+)"/)?.[1];
    const weight = block.match(/font-weight:\s*([^;]+)/)?.[1].trim();
    const style = block.match(/font-style:\s*([^;]+)/)?.[1].trim();
    const files = [...block.matchAll(/url\("?\.\.\/([^"')]+)"?\)/g)].map((url) => url[1]);
    if (family && files.length) result.push({ family, weight, style, cssPath: 'tokens/fonts.css', files });
  }
  return result;
}

async function manifest(componentList) {
  const tokenList = await tokens();
  const fontList = await fonts();
  const families = [...new Set(fontList.map((font) => font.family))];
  const publishedComponents = componentList.map(({ name }) => ({ name, sourcePath: 'dist/index.js' }));
  const value = {
    namespace: NAMESPACE,
    components: publishedComponents,
    startingPoints: ['dist/index.js', 'styles.css', 'tokens/exopter-tokens.css'],
    cards: [],
    templates: [],
    globalCssPaths: ['styles.css'],
    tokens: tokenList,
    themes: [{ selector: '.ex-dark, [data-surface="carbon"]', label: 'Carbon dark' }],
    fonts: fontList,
    brandFonts: families.map((family) => ({ family, status: 'ok', path: 'tokens/fonts.css' })),
    source: 'npm',
  };
  value.adherence = adherenceMetadata(publishedComponents, value);
  return value;
}

function adherenceMetadata(componentList, manifestValue) {
  const uniqueTokens = new Map();
  for (const token of manifestValue.tokens) {
    const current = uniqueTokens.get(token.name);
    if (current && current !== token.kind) {
      throw new Error(`Token ${token.name} has conflicting kinds: ${current} and ${token.kind}`);
    }
    uniqueTokens.set(token.name, token.kind);
  }
  return {
    components: Object.fromEntries(componentList.map(({ name }) => [name, { replaces: [] }])),
    tokens: [...uniqueTokens.keys()].sort(),
    tokenKinds: Object.fromEntries([...uniqueTokens.entries()].sort(([left], [right]) => left.localeCompare(right))),
    fontFamilies: [...new Set(manifestValue.fonts.map((font) => font.family))].sort(),
  };
}

function adherence() {
  return {
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['@exopter/design-system/components/**', '**/design_system/components/**'],
          message: "Import public components from '@exopter/design-system'.",
        }],
      }],
    },
  };
}

async function generatedOutputs() {
  const componentList = await components();
  const manifestValue = await manifest(componentList);
  const specimenEntries = {
    'dist/specimens/data.js': 'components/data/data.card.jsx',
    'dist/specimens/feedback.js': 'components/feedback/feedback.card.jsx',
    'dist/specimens/forms.js': 'components/forms/forms.card.jsx',
    'dist/ui-kits/exopter-brand.js': 'ui_kits/exopter-brand/app.jsx',
    'dist/ui-kits/os-flight.js': 'ui_kits/os-flight/app.jsx',
  };
  const outputs = new Map([
    ['_ds_bundle.js', await componentBundle(componentList)],
    ['_ds_manifest.json', json(manifestValue)],
    ['_adherence.oxlintrc.json', json(adherence())],
    ['dist/index.js', await esmBundle()],
  ]);
  for (const [output, entry] of Object.entries(specimenEntries)) {
    outputs.set(output, await compile(entry, { format: 'iife' }));
  }
  return outputs;
}

async function main() {
  const outputs = await generatedOutputs();
  const stale = [];
  for (const [path, contents] of outputs) {
    const absolute = resolve(ROOT, path);
    if (CHECK) {
      let current;
      try {
        current = await readFile(absolute, 'utf8');
      } catch {
        current = null;
      }
      if (current !== contents) stale.push(path);
    } else {
      await mkdir(dirname(absolute), { recursive: true });
      await writeFile(absolute, contents);
      console.log(`generated ${path}`);
    }
  }
  if (stale.length) {
    console.error(`Generated artifacts are stale:\n${stale.map((path) => `- ${path}`).join('\n')}`);
    console.error('Run `npm run build` and commit the resulting files.');
    process.exitCode = 1;
  } else if (CHECK) {
    console.log(`Generated artifacts are current (${outputs.size} files).`);
  }
}

await main();
