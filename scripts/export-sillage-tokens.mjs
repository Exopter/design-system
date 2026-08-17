import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CANONICAL = resolve(ROOT, 'tokens/exopter-tokens.css');

export async function canonicalTokens() {
  return readFile(CANONICAL, 'utf8');
}

export async function checkTarget(target) {
  const expected = await canonicalTokens();
  let actual;
  try {
    actual = await readFile(target, 'utf8');
  } catch {
    return false;
  }
  return actual === expected;
}

async function main() {
  const [mode, targetArgument] = process.argv.slice(2);
  if (!['--check', '--write'].includes(mode) || !targetArgument) {
    console.error('Usage: node scripts/export-sillage-tokens.mjs (--check|--write) <target.css>');
    process.exitCode = 2;
    return;
  }

  const target = resolve(process.cwd(), targetArgument);
  if (mode === '--check') {
    if (!(await checkTarget(target))) {
      console.error(`${target} differs from canonical ${CANONICAL}`);
      process.exitCode = 1;
      return;
    }
    console.log(`${target} matches canonical Exopter tokens.`);
    return;
  }

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await canonicalTokens());
  console.log(`Exported canonical Exopter tokens to ${target}`);
}

const invokedPath = process.argv[1] && resolve(process.argv[1]);
if (invokedPath === fileURLToPath(import.meta.url)) await main();
