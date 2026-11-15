import { describe, expect, it } from 'vitest';
import { paintFacetIdentity } from '../ui_kits/flightclub/membership-card.js';

describe('crystal facet identity mask', () => {
  it('keeps shared diagonal edges opaque and limited to the two actual IDs', () => {
    const pixels = new Uint32Array(64);
    paintFacetIdentity(pixels, 8, 8, [[0, 0], [8, 0], [0, 8]], 37);
    paintFacetIdentity(pixels, 8, 8, [[8, 0], [8, 8], [0, 8]], 219);
    const bytes = new Uint8Array(pixels.buffer);
    for (let offset = 0; offset < bytes.length; offset += 4) {
      expect([37, 219]).toContain(bytes[offset]);
      expect(bytes[offset + 1]).toBe(bytes[offset]);
      expect(bytes[offset + 2]).toBe(bytes[offset]);
      expect(bytes[offset + 3]).toBe(255);
    }
  });

  it('clips off-canvas facets without wrapping pixels into adjacent rows', () => {
    const pixels = new Uint32Array(16);
    paintFacetIdentity(pixels, 4, 4, [[-10, -10], [2, -10], [2, 10]], 73);
    const bytes = new Uint8Array(pixels.buffer);
    for (let y = 0; y < 4; y++) {
      for (const x of [2, 3]) expect(bytes[(y * 4 + x) * 4 + 3]).toBe(0);
    }
    expect(bytes.some((value) => value === 73)).toBe(true);
  });
});
