import { useState } from 'react';
import { signIn, signUp } from '../lib/accountApi.js';

export default function AccountScreen({ session, isCreator, onSignOut, onOpenInstall, onSwitchToCreator }) {
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError('');
    setInfo('');
    if (tab === 'signin') {
      const { error } = await signIn(email.trim(), password);
      if (error) setError('אימייל או סיסמה שגויים');
    } else {
      const { data, error } = await signUp(email.trim(), password);
      if (error) {
        setError(error.message.toLowerCase().includes('password')
          ? 'הסיסמה חלשה מדי. נסו לפחות 6 תווים.'
          : 'ההרשמה נכשלה. אולי כבר קיים חשבון עם האימייל הזה?');
      } else if (!data.session) {
        setInfo('שלחנו לכם מייל אישור. לחצו על הקישור שבו ואז התחברו.');
        setTab('signin');
        setPassword('');
      }
    }
    setLoading(false);
  }

  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">החשבון שלי</span>
      </div>

      {session ? (
        <div className="builder-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>מחוברים כ־</span>
          <span dir="ltr" style={{ fontWeight: 700, textAlign: 'right' }}>{session.user.email}</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            המסלולים ששמרתם ♡ נשמרים בחשבון וזמינים בכל מכשיר.
          </span>
          {isCreator && (
            <span className="link-action" onClick={onSwitchToCreator}>מעבר למצב יוצר</span>
          )}
          <button
            type="button"
            className="publish-btn"
            style={{ background: 'var(--bg-header)', border: 'none', width: '100%' }}
            onClick={onSignOut}
          >
            התנתקות
          </button>
        </div>
      ) : (
        <form className="builder-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            אפשר להשתמש באתר בלי חשבון. עם חשבון, המסלולים ששמרתם ♡ יישמרו בכל המכשירים שלכם.
          </span>
          <div className="chip-row" style={{ margin: 0, padding: 0 }}>
            <div className={'chip' + (tab === 'signin' ? ' chip--active' : '')} onClick={() => { setTab('signin'); setError(''); }}>
              התחברות
            </div>
            <div className={'chip' + (tab === 'signup' ? ' chip--active' : '')} onClick={() => { setTab('signup'); setError(''); setInfo(''); }}>
              הרשמה
            </div>
          </div>

          <div className="field">
            <span className="field__label">אימייל</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" autoComplete="username" required />
          </div>
          <div className="field">
            <span className="field__label">{tab === 'signup' ? 'סיסמה (לפחות 6 תווים)' : 'סיסמה'}</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
              autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              minLength={tab === 'signup' ? 6 : undefined}
              required
            />
          </div>

          {error && <span style={{ fontSize: 13, color: '#A4503C' }}>{error}</span>}
          {info && <span style={{ fontSize: 13, color: 'var(--link)' }}>{info}</span>}

          <button
            type="submit"
            className="publish-btn"
            style={{ background: 'var(--bg-header)', border: 'none', width: '100%' }}
          >
            {loading ? 'רגע...' : tab === 'signup' ? 'יצירת חשבון' : 'התחברות'}
          </button>
        </form>
      )}

      <span className="link-action" style={{ textAlign: 'center' }} onClick={onOpenInstall}>
        איך מוסיפים את האתר למסך הבית?
      </span>
    </div>
  );
}
