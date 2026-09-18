import { useState } from 'react';
import { requestPasswordReset } from '../lib/accountApi.js';
import { describeAuthError } from '../lib/authErrors.js';
import { press } from '../utils/a11y.js';

export default function PasswordResetForm({ initialEmail = '', onBack }) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setError('');
    const { error } = await requestPasswordReset(email.trim());
    setLoading(false);
    if (error) setError(describeAuthError(error, 'לא הצלחנו לשלוח את המייל. נסו שוב.'));
    else setSent(true);
  }

  if (sent) {
    return (
      <div className="builder-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontWeight: 700 }}>בדקו את המייל שלכם</span>
        <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
          אם קיים חשבון עם הכתובת <b dir="ltr">{email.trim()}</b>, שלחנו אליה קישור לבחירת סיסמה חדשה.
          אם לא הגיע, בדקו גם בספאם.
        </span>
        <span className="link-action" {...press(onBack)}>חזרה להתחברות</span>
      </div>
    );
  }

  return (
    <form className="builder-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ fontWeight: 700 }}>איפוס סיסמה</span>
      <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
        הכניסו את האימייל שלכם ונשלח אליו קישור לבחירת סיסמה חדשה.
      </span>
      <label className="field">
        <span className="field__label">אימייל</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" autoComplete="username" required />
      </label>
      {error && <span style={{ fontSize: 13, color: '#A4503C' }}>{error}</span>}
      <button
        type="submit"
        className="publish-btn"
        style={{ background: 'var(--bg-header)', border: 'none', width: '100%' }}
      >
        {loading ? 'שולח...' : 'שליחת קישור'}
      </button>
      <span className="link-action" style={{ textAlign: 'center' }} {...press(onBack)}>חזרה להתחברות</span>
    </form>
  );
}
