import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { RANKS } from '../ui_kits/flightclub/membership-card.js';

// Small SVG counterparts of the card's shield, rank colors and centered devices.
const root = new URL('../assets/flight-club/', import.meta.url);
const check = process.argv.includes('--check');
if (!check) await mkdir(root, { recursive: true });
for (const [key, rank] of Object.entries(RANKS)) {
  // Match buildInsignia's stack, starFacets' four-point star and upward chevrons.
  const top = .06 + .03 * (rank.stripes - 1) + (.4 + .1 + .34 + .15 + (rank.stripes - 1) * .22) / 2;
  const point = (x, y) => `${(32 + x * 28).toFixed(2)},${(40 - y * 28).toFixed(2)}`;
  const star = Array.from({ length: 8 }, (_, i) => {
    const angle = Math.PI / 2 + i * Math.PI / 4;
    const radius = i % 2 ? .068 : .2;
    return point(Math.cos(angle) * radius, top - .2 + Math.sin(angle) * radius);
  }).join(' ');
  const chevrons = Array.from({ length: rank.stripes }, (_, i) => {
    const apex = top - .4 - .1 - i * .22;
    const points = [[-.6, apex - .34], [0, apex], [.6, apex - .34], [.6, apex - .49], [0, apex - .15], [-.6, apex - .49]];
    return `<polygon points="${points.map(([x, y]) => point(x, y)).join(' ')}"/>`;
  }).join('');
  const device = rank.crystal
    ? '<path fill="#eff7ff" d="M20 23H44L53 32 32 58 11 32Z"/><path fill="#83b9ee" d="M11 32H53L32 58Z"/><path fill="#d3e8ff" d="M28 23H36L32 32Z"/><path fill="#cfe2f8" d="M22 32H32V58Z"/><path fill="#9dbfe8" d="M32 32H42L32 58Z"/>'
    : `<polygon points="${star}"/>${chevrons}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80"><defs><linearGradient id="rim" x2="1" y2="1"><stop stop-color="${rank.device}"/><stop offset=".5" stop-color="${rank.metal}"/><stop offset="1" stop-color="${rank.color}"/></linearGradient></defs><path fill="url(#rim)" d="M32 2 61 14 57 58 32 77 7 58 3 14Z"/><path fill="${rank.field}" d="M32 7 56 17 52 55 32 71 12 55 8 17Z"/><g fill="${rank.device}">${device}</g></svg>\n`;
  const url = new URL(`insignia-${key}.svg`, root);
  if (check) {
    if (await readFile(url, 'utf8') !== svg) throw new Error(`Flight Club insignia differs: ${key}`);
  } else await writeFile(url, svg);
}
console.log(`Flight Club insignia ${check ? 'verified' : 'exported'}.`);
