import { useState } from 'react';
import { updatePassword } from '../lib/accountApi.js';
import { describeAuthError } from '../lib/authErrors.js';
import { press } from '../utils/a11y.js';

// Shown when someone opens the link from a password-reset email.
export default function RecoveryScreen({ onDone, onCancel }) {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    if (password.length < 6) {
      setError('הסיסמה חלשה מדי. נסו לפחות 6 תווים.');
      return;
    }
    if (password !== repeat) {
      setError('שתי הסיסמאות לא זהות.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) setError(describeAuthError(error, 'לא הצלחנו לשמור את הסיסמה. נסו שוב.'));
    else onDone();
  }

  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">בחירת סיסמה חדשה</span>
      </div>

      <form className="builder-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label className="field">
          <span className="field__label">סיסמה חדשה (לפחות 6 תווים)</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
            autoComplete="new-password"
            required
          />
        </label>
        <label className="field">
          <span className="field__label">הקלידו שוב את הסיסמה</span>
          <input
            type="password"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            dir="ltr"
            autoComplete="new-password"
            required
          />
        </label>

        {error && <span style={{ fontSize: 13, color: '#A4503C' }}>{error}</span>}

        <button
          type="submit"
          className="publish-btn"
          style={{ background: 'var(--bg-header)', border: 'none', width: '100%' }}
        >
          {loading ? 'שומר...' : 'שמירת סיסמה'}
        </button>
        <span className="link-action" style={{ textAlign: 'center' }} {...press(onCancel)}>דלגו לעת עתה</span>
      </form>
    </div>
  );
}
