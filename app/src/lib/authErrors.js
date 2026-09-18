// Turns a Supabase auth error into a message a visitor can act on.
export function describeAuthError(error, fallback = 'משהו השתבש. נסו שוב.') {
  if (!error) return '';
  const code = error.code || '';
  const message = (error.message || '').toLowerCase();

  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'האימייל עוד לא אושר. לחצו על הקישור במייל שקיבלתם.';
  }
  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'אימייל או סיסמה שגויים.';
  }
  if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit' || message.includes('rate limit')) {
    return 'נשלחו יותר מדי בקשות. חכו כמה דקות ונסו שוב.';
  }
  if (code === 'weak_password' || message.includes('password should be') || message.includes('weak')) {
    return 'הסיסמה חלשה מדי. נסו לפחות 6 תווים.';
  }
  if (code === 'same_password' || message.includes('different from the old')) {
    return 'בחרו סיסמה שונה מהקודמת.';
  }
  if (code === 'user_already_exists' || message.includes('already registered')) {
    return 'כבר קיים חשבון עם האימייל הזה. נסו להתחבר.';
  }
  if (code === 'signup_disabled' || message.includes('signups not allowed')) {
    return 'ההרשמה סגורה כרגע.';
  }
  if (message.includes('failed to fetch') || message.includes('network')) {
    return 'אין חיבור לאינטרנט. בדקו את החיבור ונסו שוב.';
  }
  return fallback;
}

export function isEmailNotConfirmed(error) {
  if (!error) return false;
  return error.code === 'email_not_confirmed' || (error.message || '').toLowerCase().includes('email not confirmed');
}
