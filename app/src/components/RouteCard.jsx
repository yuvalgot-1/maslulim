import ImageSlot from './ImageSlot.jsx';

export default function RouteCard({ route, stats, saved, onOpen, onToggleSave }) {
  return (
    <div className="route-card" onClick={() => onOpen(route.id)}>
      <div className="route-card__cover">
        <ImageSlot id={'cover-' + route.id} placeholder={'תמונת שער · ' + route.area} known={!!route.has_cover} />
        <div className="route-card__scrim" />
        <div className="route-card__cover-text">
          <span className="route-card__title">{route.title}</span>
          <span className="route-card__chain">{route.stops.map((s) => s.name).join(' → ')}</span>
        </div>
      </div>
      <div className="route-card__meta">
        <div className="route-card__facts">
          <span>{route.duration}</span>
          <span className="route-card__facts-sep">•</span>
          <span>{route.stops.length} תחנות</span>
          {stats && (stats.ratingCount > 0 || stats.likes > 0) && (
            <>
              <span className="route-card__facts-sep">•</span>
              {stats.ratingCount > 0 && <span className="route-card__rating">★ {stats.ratingAvg.toFixed(1)} ({stats.ratingCount})</span>}
              {stats.likes > 0 && <span>👍 {stats.likes}</span>}
            </>
          )}
        </div>
        <div className="route-card__right">
          <div className="route-card__author">
            <span className="route-card__initials">{route.author.slice(0, 1)}</span>
            <span>{route.author}</span>
          </div>
          <div
            className={'save-btn' + (saved ? ' save-btn--active' : '')}
            onClick={(e) => { e.stopPropagation(); onToggleSave(route.id); }}
          >
            <span className="save-btn__icon">{saved ? '♥' : '♡'}</span>
            <span>{saved ? 'שמור' : 'שמירה'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
