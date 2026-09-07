// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

describe('package consumers', () => {
  it('tree-shakes a single-component import without retaining other component styles', async () => {
    const result = await build({
      stdin: { contents: "export { Button } from '@exopter/design-system';", resolveDir: ROOT },
      bundle: true, minify: true, format: 'esm', write: false, external: ['react'],
    });
    const script = result.outputFiles[0].text;
    expect(script).toContain('exds-btn');
    expect(script).not.toMatch(/exds-(drawer|input|switch)|createElement\(["']style/);
    expect(Buffer.byteLength(script)).toBeLessThan(5000);
  });

  it('renders on the server without reading or mutating document during import', () => {
    const html = execFileSync(process.execPath, ['--input-type=module', '-e', `
      Object.defineProperty(globalThis, 'document', { get() { throw new Error('DOM access during SSR'); } });
      const { Button } = await import('@exopter/design-system');
      const { createElement } = await import('react');
      const { renderToStaticMarkup } = await import('react-dom/server');
      console.log(renderToStaticMarkup(createElement(Button, null, 'Save flight')));
    `], { cwd: ROOT, encoding: 'utf8' });
    expect(html).toContain('exds-btn--primary');
    expect(html).toContain('Save flight');
  });

  it('ships every component stylesheet through the existing global entrypoint', async () => {
    const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
    const references = [...css.matchAll(/@import "(components\/[^"?]+\.css)"/g)].map((match) => match[1]);
    expect(references).toHaveLength(17);
    for (const reference of references) {
      const rules = await readFile(new URL(`../${reference}`, import.meta.url), 'utf8');
      expect(rules).toMatch(/\.exds-/);
    }
  });
});
