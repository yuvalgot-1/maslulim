import { useState } from 'react';
import { COLLECTIONS, AREAS, CATEGORIES } from '../data/routes.js';

const SORTS = [
  { id: 'new', label: 'חדשים' },
  { id: 'rating', label: 'דירוג גבוה' },
  { id: 'likes', label: 'הכי אהובים' },
];

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
  sort,
  onSort,
  stopCat,
  onStopCat,
  hasFilters,
  onReset,
}) {
  const isCreator = mode === 'creator';
  const [areaPickerOpen, setAreaPickerOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sortActive = sort !== 'new' || stopCat !== 'all';

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
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="search-row" style={{ flex: '1 1 auto' }}>
              <span className="search-row__icon">⌕</span>
              <input
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="חפשו מסלול, מקום או אזור"
                dir="rtl"
              />
            </div>
            <div className="area-filter">
              <div
                className={'chip area-filter__btn' + (areaFilter !== 'all' ? ' chip--active' : '')}
                onClick={() => { setSortOpen(false); setAreaPickerOpen((o) => !o); }}
              >
                <span>{areaFilter === 'all' ? 'אזור' : areaFilter}</span>
                <span className="area-filter__arrow">{areaPickerOpen ? '▴' : '▾'}</span>
              </div>
              {areaPickerOpen && (
                <div className="area-filter__panel">
                  {AREA_FILTERS.map((a) => (
                    <div
                      key={a}
                      className={'small-chip' + (areaFilter === a ? ' small-chip--active' : '')}
                      onClick={() => { onAreaFilter(a); setAreaPickerOpen(false); }}
                    >
                      {a === 'all' ? 'כל האזורים' : a}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="area-filter">
              <div
                className={'chip area-filter__btn' + (sortActive ? ' chip--active' : '')}
                onClick={() => { setAreaPickerOpen(false); setSortOpen((o) => !o); }}
              >
                <span>מיון</span>
                <span className="area-filter__arrow">{sortOpen ? '▴' : '▾'}</span>
              </div>
              {sortOpen && (
                <div className="area-filter__panel">
                  <span className="area-filter__group">מיון לפי</span>
                  {SORTS.map((o) => (
                    <div
                      key={o.id}
                      className={'small-chip' + (sort === o.id ? ' small-chip--active' : '')}
                      onClick={() => onSort(o.id)}
                    >
                      {o.label}
                    </div>
                  ))}
                  <span className="area-filter__group">יש בדרך תחנה של</span>
                  {['all', ...Object.keys(CATEGORIES)].map((c) => (
                    <div
                      key={c}
                      className={'small-chip' + (stopCat === c ? ' small-chip--active' : '')}
                      onClick={() => onStopCat(c)}
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
                className={'chip' + (collection === c.id ? ' chip--active' : '')}
                onClick={() => onCollection(c.id)}
              >
                {c.label}
              </div>
            ))}
            {hasFilters && (
              <div className="chip chip--reset" onClick={onReset}>נקה סינון ✕</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
