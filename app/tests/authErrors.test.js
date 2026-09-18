import { describe, it, expect } from 'vitest';
import { describeAuthError, isEmailNotConfirmed } from '../src/lib/authErrors.js';

describe('describeAuthError', () => {
  it('returns nothing when there is no error', () => {
    expect(describeAuthError(null)).toBe('');
  });

  it('tells an unconfirmed email apart from a wrong password', () => {
    const unconfirmed = describeAuthError({ code: 'email_not_confirmed' });
    const wrong = describeAuthError({ code: 'invalid_credentials' });
    expect(unconfirmed).toContain('אושר');
    expect(wrong).toContain('שגויים');
    expect(unconfirmed).not.toBe(wrong);
  });

  it('understands errors that only carry a message', () => {
    expect(describeAuthError({ message: 'Email not confirmed' })).toContain('אושר');
    expect(describeAuthError({ message: 'Invalid login credentials' })).toContain('שגויים');
    expect(describeAuthError({ message: 'Password should be at least 6 characters' })).toContain('חלשה');
    expect(describeAuthError({ message: 'email rate limit exceeded' })).toContain('יותר מדי');
  });

  it('explains network failures and unknown errors', () => {
    expect(describeAuthError({ message: 'Failed to fetch' })).toContain('חיבור');
    expect(describeAuthError({ message: 'boom' }, 'custom')).toBe('custom');
  });
});

describe('isEmailNotConfirmed', () => {
  it('detects the unconfirmed-email error by code or message', () => {
    expect(isEmailNotConfirmed({ code: 'email_not_confirmed' })).toBe(true);
    expect(isEmailNotConfirmed({ message: 'Email not confirmed' })).toBe(true);
    expect(isEmailNotConfirmed({ code: 'invalid_credentials' })).toBe(false);
    expect(isEmailNotConfirmed(null)).toBe(false);
  });
});
