import { Component } from 'react';

const RELOAD_KEY = 'maslulim-chunk-reload';

function isChunkError(error) {
  const msg = String((error && error.message) || error || '');
  return /dynamically imported module|Importing a module script failed|Loading chunk|Failed to fetch/i.test(msg);
}

// A screen that fails to load (usually a stale cached page after a new deploy)
// must not blank the whole app: reload once to pick up the new version,
// otherwise show a message with a retry button.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (!isChunkError(error)) return;
    try {
      if (sessionStorage.getItem(RELOAD_KEY)) return;
      sessionStorage.setItem(RELOAD_KEY, '1');
    } catch { /* storage unavailable: fall through to the message */ }
    window.location.reload();
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div style={{ padding: 24, textAlign: 'center', direction: 'rtl' }}>
        <p style={{ fontWeight: 700 }}>משהו השתבש בטעינת המסך.</p>
        <p style={{ fontSize: 13, opacity: 0.7, wordBreak: 'break-word' }}>{String(error.message || error)}</p>
        <button
          type="button"
          className="chip chip--active"
          style={{ margin: '12px auto' }}
          onClick={() => {
            try { sessionStorage.removeItem(RELOAD_KEY); } catch { /* ignore */ }
            window.location.reload();
          }}
        >
          טעינה מחדש
        </button>
      </div>
    );
  }
}
