import { describe, it, expect } from 'vitest';
import { isSafeHttpUrl } from '../src/utils/url.js';

describe('isSafeHttpUrl', () => {
  it('accepts http and https URLs', () => {
    expect(isSafeHttpUrl('https://maps.google.com/?q=x')).toBe(true);
    expect(isSafeHttpUrl('http://example.com')).toBe(true);
  });

  it('rejects other schemes, junk and empty values', () => {
    expect(isSafeHttpUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeHttpUrl('data:text/html,hi')).toBe(false);
    expect(isSafeHttpUrl('not a url')).toBe(false);
    expect(isSafeHttpUrl('   ')).toBe(false);
    expect(isSafeHttpUrl(undefined)).toBe(false);
  });
});
