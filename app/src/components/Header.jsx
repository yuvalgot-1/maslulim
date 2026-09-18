import { COLLECTIONS } from '../data/routes.js';

export default function Header({ mode, onToggleMode, showSearch, query, onQuery, collection, onCollection }) {
  const isCreator = mode === 'creator';
  return (
    <div className="app-header">
      <div className="app-header__top">
        <div className="app-header__title">
          <span className="app-header__title-main">מיטיבי לסת</span>
          <span className="app-header__title-sub">חוויה שלמה, לא רק נקודה</span>
        </div>
        <div className="mode-toggle" onClick={onToggleMode}>
          <span className="mode-toggle__dot" style={{ background: isCreator ? 'var(--dot-creator)' : 'var(--dot-public)' }} />
          <span>{isCreator ? 'מצב יוצר' : 'מצב גולש'}</span>
        </div>
      </div>

      {showSearch && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="search-row">
            <span className="search-row__icon">⌕</span>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="חפשו מסלול, מקום או אזור"
              dir="rtl"
            />
          </div>
          <div className="chip-row">
            {COLLECTIONS.map((c) => (
              <div
                key={c.id}
                className={'chip' + (collection === c.id ? ' chip--active' : '')}
                onClick={() => onCollection(c.id)}
              >
                {c.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
