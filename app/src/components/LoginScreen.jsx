import { useState } from 'react';
import { supabase } from '../lib/supabase.js';

export default function LoginScreen({ onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) setError('אימייל או סיסמה שגויים');
  }

  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">התחברות יוצר</span>
      </div>

      <form className="builder-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <span className="field__label">אימייל</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
            autoComplete="username"
            required
          />
        </div>
        <div className="field">
          <span className="field__label">סיסמה</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <span style={{ fontSize: 13, color: '#A4503C' }}>{error}</span>}

        <button
          type="submit"
          className="publish-btn"
          style={{ background: 'var(--bg-header)', border: 'none', width: '100%' }}
        >
          {loading ? 'מתחבר...' : 'התחברות'}
        </button>
        <span className="link-action" style={{ textAlign: 'center' }} onClick={onCancel}>
          ביטול
        </span>
      </form>
    </div>
  );
}
