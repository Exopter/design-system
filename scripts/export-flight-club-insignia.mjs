import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { RANKS, WING_FACETS } from '../ui_kits/flightclub/membership-card.js';

// Small SVG counterparts of the card's shield, rank colors and centered devices.
const root = new URL('../assets/flight-club/', import.meta.url);
const check = process.argv.includes('--check');
if (!check) await mkdir(root, { recursive: true });
for (const [key, rank] of Object.entries(RANKS)) {
  // Project the same faceted Exowing used by the physical card onto its shield.
  const mix = (a, b, t) => '#' + [1, 3, 5].map((offset) =>
    Math.round(parseInt(a.slice(offset, offset + 2), 16) * (1 - t) + parseInt(b.slice(offset, offset + 2), 16) * t).toString(16).padStart(2, '0')
  ).join('');
  let device = '';
  for (let index = 0; index < WING_FACETS.length; index += 9) {
    const points = [0, 3, 6].map((offset) => `${(32 + WING_FACETS[index + offset] * .029).toFixed(2)},${(39 - WING_FACETS[index + offset + 1] * .04).toFixed(2)}`).join(' ');
    const height = (WING_FACETS[index + 2] + WING_FACETS[index + 5] + WING_FACETS[index + 8]) / 3;
    device += `<polygon points="${points}" fill="${mix(rank.metal, rank.device, Math.min(1, height / 170))}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80"><defs><linearGradient id="rim" x2="1" y2="1"><stop stop-color="${rank.device}"/><stop offset=".5" stop-color="${rank.metal}"/><stop offset="1" stop-color="${rank.color}"/></linearGradient></defs><path fill="url(#rim)" d="M32 2 61 14 57 58 32 77 7 58 3 14Z"/><path fill="${rank.field}" d="M32 7 56 17 52 55 32 71 12 55 8 17Z"/><g fill="${rank.device}">${device}</g></svg>\n`;
  const url = new URL(`insignia-${key}.svg`, root);
  if (check) {
    if (await readFile(url, 'utf8') !== svg) throw new Error(`Flight Club insignia differs: ${key}`);
  } else await writeFile(url, svg);
}
console.log(`Flight Club insignia ${check ? 'verified' : 'exported'}.`);
