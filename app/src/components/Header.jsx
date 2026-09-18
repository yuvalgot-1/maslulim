import { useState } from 'react';
import { COLLECTIONS, AREAS, CATEGORIES } from '../data/routes.js';
import { press } from '../utils/a11y.js';

const AREA_FILTERS = ['all', ...AREAS];

export default function Header({
  mode,
  onToggleMode,
  showSearch,
  query,
  onQuery,
  collection,
  onCollection,
  areaFilter,
  onAreaFilter,
  stopCat,
  onStopCat,
  hasFilters,
  onReset,
}) {
  const isCreator = mode === 'creator';
  const [areaPickerOpen, setAreaPickerOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <div className="app-header">
      <div className="app-header__top">
        <div className="app-header__title">
          <span className="app-header__title-main">מיטיבי לסת</span>
          <span className="app-header__title-sub">חוויה שלמה, לא רק נקודה</span>
        </div>
        <div className="mode-toggle" aria-label={isCreator ? 'מצב יוצר, לחצו למעבר למצב גולש' : 'מצב גולש, לחצו למעבר למצב יוצר'} {...press(onToggleMode)}>
          <span className="mode-toggle__dot" style={{ background: isCreator ? 'var(--dot-creator)' : 'var(--dot-public)' }} />
          <span>{isCreator ? 'מצב יוצר' : 'מצב גולש'}</span>
        </div>
      </div>

      {showSearch && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="search-row" style={{ flex: '1 1 auto' }}>
              <span className="search-row__icon">⌕</span>
              <input
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="חפשו מסלול, מקום או אזור" aria-label="חפשו מסלול, מקום או אזור"
                dir="rtl"
              />
            </div>
            <div className="area-filter">
              <div
                className={'chip area-filter__btn' + (areaFilter !== 'all' ? ' chip--active' : '')}
                aria-haspopup="true"
                aria-expanded={areaPickerOpen}
                {...press(() => { setCatOpen(false); setAreaPickerOpen((o) => !o); })}
              >
                <span>{areaFilter === 'all' ? 'אזור' : areaFilter}</span>
                <span className="area-filter__arrow">{areaPickerOpen ? '▴' : '▾'}</span>
              </div>
              {areaPickerOpen && (
                <div className="area-filter__panel">
                  {AREA_FILTERS.map((a) => (
                    <div
                      key={a}
                      className={'small-chip' + (areaFilter === a ? ' small-chip--active' : '')} aria-pressed={areaFilter === a}
                      {...press(() => { onAreaFilter(a); setAreaPickerOpen(false); })}
                    >
                      {a === 'all' ? 'כל האזורים' : a}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="area-filter">
              <div
                className={'chip area-filter__btn' + (stopCat !== 'all' ? ' chip--active' : '')}
                aria-haspopup="true"
                aria-expanded={catOpen}
                {...press(() => { setAreaPickerOpen(false); setCatOpen((o) => !o); })}
              >
                <span>{stopCat === 'all' ? 'סוג תחנה' : CATEGORIES[stopCat].label}</span>
                <span className="area-filter__arrow">{catOpen ? '▴' : '▾'}</span>
              </div>
              {catOpen && (
                <div className="area-filter__panel">
                  <span className="area-filter__group">יש בדרך תחנה של</span>
                  {['all', ...Object.keys(CATEGORIES)].map((c) => (
                    <div
                      key={c}
                      className={'small-chip' + (stopCat === c ? ' small-chip--active' : '')} aria-pressed={stopCat === c}
                      {...press(() => { onStopCat(c); setCatOpen(false); })}
                    >
                      {c === 'all' ? 'הכול' : CATEGORIES[c].label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="chip-row">
            {COLLECTIONS.map((c) => (
              <div
                key={c.id}
                className={'chip' + (collection === c.id ? ' chip--active' : '')} aria-pressed={collection === c.id}
                {...press(() => onCollection(c.id))}
              >
                {c.label}
              </div>
            ))}
            {hasFilters && (
              <div className="chip chip--reset" {...press(onReset)}>נקה סינון ✕</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
