import { describe, it, expect } from 'vitest';
import { fitWithin } from '../src/utils/resizeImage.js';

describe('fitWithin', () => {
  it('leaves images that are already small enough', () => {
    expect(fitWithin(800, 600)).toEqual({ width: 800, height: 600 });
    expect(fitWithin(1600, 1200)).toEqual({ width: 1600, height: 1200 });
  });

  it('scales the longer side down to the limit and keeps the aspect ratio', () => {
    expect(fitWithin(4000, 3000)).toEqual({ width: 1600, height: 1200 });
    expect(fitWithin(3000, 4000)).toEqual({ width: 1200, height: 1600 });
  });

  it('respects a custom limit', () => {
    expect(fitWithin(1000, 500, 500)).toEqual({ width: 500, height: 250 });
  });
});
