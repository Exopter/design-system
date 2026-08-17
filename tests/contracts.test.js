import { mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { canonicalTokens, checkTarget } from '../scripts/export-sillage-tokens.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFile(resolve(ROOT, path), 'utf8');
const SRI_SCRIPTS = new Map([
  [
    'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
    'sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z',
  ],
  [
    'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
    'sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1',
  ],
]);

function isPackaged(reference, packageFiles) {
  return packageFiles.some((entry) => entry === reference || (entry.endsWith('/') && reference.startsWith(entry)));
}

describe('generated contracts', () => {
  it('publishes every component through the package entrypoint', async () => {
    const entrypoint = await read('index.js');
    const manifest = JSON.parse(await read('_ds_manifest.json'));
    const packageJson = JSON.parse(await read('package.json'));
    const packageEntry = await import('../dist/index.js');
    for (const component of manifest.components) {
      expect(entrypoint).toContain(`export { ${component.name} }`);
      expect(packageEntry).toHaveProperty(component.name);
    }
    expect(manifest.globalCssPaths).toEqual(['styles.css']);
    expect(manifest.cards).toEqual([]);
    expect(manifest.templates).toEqual([]);

    const publishedReferences = [
      ...manifest.components.map(({ sourcePath }) => sourcePath),
      ...manifest.startingPoints,
      ...manifest.globalCssPaths,
      ...manifest.tokens.map(({ definedIn }) => definedIn),
      ...manifest.fonts.flatMap(({ cssPath, files }) => [cssPath, ...files]),
      ...manifest.brandFonts.map(({ path }) => path),
    ];
    for (const reference of new Set(publishedReferences)) {
      expect(isPackaged(reference, packageJson.files), `${reference} must be included in package files`).toBe(true);
    }
    expect(packageJson.sideEffects).toEqual(expect.arrayContaining(['**/*.css', 'dist/index.js']));
  });

  it('contains only component sources in the browser bundle', async () => {
    const bundle = await read('_ds_bundle.js');
    const firstLine = bundle.split('\n', 1)[0];
    const metadata = JSON.parse(firstLine.match(/\{.*\}/)[0]);
    expect(metadata.components).toHaveLength(13);
    expect(Object.keys(metadata.sourceHashes).every((path) => path.startsWith('components/'))).toBe(true);

    const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>');
    dom.window.React = React;
    new Function('window', 'document', bundle)(dom.window, dom.window.document);
    for (const component of metadata.components) {
      expect(dom.window.ExopterDesignSystem_4c9fc9).toHaveProperty(component.name);
    }
    expect(dom.window.ExopterDesignSystem_4c9fc9).not.toHaveProperty('__errors');
  });

  it('classifies semantic token kinds correctly', async () => {
    const manifest = JSON.parse(await read('_ds_manifest.json'));
    const kinds = manifest.adherence.tokenKinds;
    expect(kinds['--text-body']).toBe('color');
    expect(kinds['--ex-state-ready-text']).toBe('color');
    expect(kinds['--sp-4']).toBe('spacing');
    expect(manifest.adherence.components).toHaveProperty('ReadinessStrip');
    expect(manifest.adherence.components).not.toHaveProperty('ReadinessItem');
    expect(manifest.themes).toEqual([
      { selector: '.ex-dark, [data-surface="carbon"]', label: 'Carbon dark' },
    ]);

    const adherence = JSON.parse(await read('_adherence.oxlintrc.json'));
    expect(adherence.rules['no-restricted-imports'][0]).toBe('error');
  });
});

describe('static specimens', () => {
  it('use precompiled scripts without runtime Babel', async () => {
    const paths = [
      'components/data/data.card.html',
      'components/feedback/feedback.card.html',
      'components/forms/forms.card.html',
      'ui_kits/exopter-brand/index.html',
      'ui_kits/os-flight/index.html',
    ];
    for (const path of paths) {
      const html = await read(path);
      expect(html).not.toContain('text/babel');
      expect(html).not.toContain('@babel/standalone');
      const externalScripts = [...html.matchAll(/<script[^>]+src="(https:[^"]+)"[^>]*>/g)];
      expect(externalScripts.map((script) => script[1])).toEqual([...SRI_SCRIPTS.keys()]);
      for (const script of externalScripts) {
        expect(script[0]).toContain(`integrity="${SRI_SCRIPTS.get(script[1])}"`);
        expect(script[0]).toContain('crossorigin="anonymous"');
      }
    }
  });

  it('only references local files that exist', async () => {
    const htmlFiles = [
      'index.html',
      'components/data/data.card.html',
      'components/feedback/feedback.card.html',
      'components/forms/forms.card.html',
      'ui_kits/exopter-brand/index.html',
      'ui_kits/os-flight/index.html',
      'templates/os-screen/OSScreen.dc.html',
    ];
    for (const path of htmlFiles) {
      const html = await read(path);
      for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
        const reference = match[1].split(/[?#]/, 1)[0];
        if (!reference || /^(?:https?:|#)/.test(match[1])) continue;
        await expect(stat(resolve(ROOT, dirname(path), reference))).resolves.toBeDefined();
      }
    }
    expect(await read('index.html')).not.toContain('/devreference/design_system');
  });
});

describe('Sillage token export', () => {
  it('checks exact byte parity with the canonical source', async () => {
    const folder = await mkdtemp(resolve(tmpdir(), 'exopter-design-system-'));
    const target = resolve(folder, 'exopter_design_system.css');
    const canonical = await canonicalTokens();
    await writeFile(target, canonical);
    expect(await checkTarget(target)).toBe(true);
    await writeFile(target, `${canonical}\n/* drift */\n`);
    expect(await checkTarget(target)).toBe(false);
  });
});
