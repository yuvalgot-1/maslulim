import { describe, it, expect, vi } from 'vitest';
import { press } from '../src/utils/a11y.js';

function keyEvent(key, target, currentTarget = target) {
  return { key, target, currentTarget, preventDefault: vi.fn() };
}

describe('press', () => {
  it('makes an element focusable and announces it as a button', () => {
    const props = press(() => {});
    expect(props.role).toBe('button');
    expect(props.tabIndex).toBe(0);
  });

  it('returns nothing when there is no handler', () => {
    expect(press(undefined)).toEqual({});
  });

  it('activates on Enter and Space', () => {
    const handler = vi.fn();
    const el = {};
    const { onKeyDown } = press(handler);
    onKeyDown(keyEvent('Enter', el));
    onKeyDown(keyEvent(' ', el));
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('ignores other keys and keys pressed on a nested control', () => {
    const handler = vi.fn();
    const { onKeyDown } = press(handler);
    onKeyDown(keyEvent('a', {}));
    onKeyDown(keyEvent('Enter', {}, {}));
    expect(handler).not.toHaveBeenCalled();
  });
});
