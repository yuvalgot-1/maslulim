import ImageSlot from './ImageSlot.jsx';
import { getCategory } from '../data/routes.js';
import { isSafeHttpUrl } from '../utils/url.js';

const PIN_TOP = [34, 64, 96];
const PIN_RIGHT = [30, 46, 62];

export default function RouteDetailScreen({ route, saved, onToggleSave, onBack, onShare, editable }) {
  const facts = [
    { value: route.duration.split(' · ')[1] || route.duration, label: 'משך המסלול' },
    { value: route.stops.length, label: 'תחנות' },
    { value: route.distance.replace(' ממך', ''), label: 'מרחק ממך' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="detail-cover">
        <ImageSlot id={'cover-' + route.id} placeholder={'תמונת שער · ' + route.area} editable={editable} />
        <div className="detail-cover__scrim" />
        <button className="detail-cover__back" onClick={onBack}>›</button>
        <div className="detail-cover__text">
          <span className="detail-cover__area">{route.area}</span>
          <span className="detail-cover__title">{route.title}</span>
        </div>
      </div>

      <div className="detail-facts">
        {facts.map((f, i) => (
          <div className="detail-facts__item" key={i}>
            <span className="detail-facts__value">{f.value}</span>
            <span className="detail-facts__label">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="detail-content">
        <p className="detail-blurb">{route.blurb}</p>

        <div className="map-preview">
          <div className="map-preview__pattern" />
          <div className="map-preview__water" />
          {route.stops.map((s, i) => (
            <div
              key={i}
              className="map-preview__pin"
              style={{ top: PIN_TOP[i % 3] + 'px', right: PIN_RIGHT[i % 3] + '%' }}
            >
              {i + 1}
            </div>
          ))}
          <div className="map-preview__label">תצוגת מפה · {route.area}</div>
        </div>

        <div className="timeline">
          <span className="timeline__title">המסלול, תחנה אחר תחנה</span>
          {route.stops.map((s, i) => (
            <div className="timeline__row" key={i}>
              <div className="timeline__rail">
                <div className="timeline__dot">{i + 1}</div>
                <div className="timeline__line" />
              </div>
              <div className="timeline__body">
                <div className="stop-card">
                  <div className="stop-card__photo">
                    <ImageSlot id={'stop-' + route.id + '-' + i} placeholder={s.name} editable={editable} />
                    <div className="stop-card__tag" style={{ background: getCategory(s.cat).color }}>
                      {getCategory(s.cat).label}
                    </div>
                  </div>
                  <div className="stop-card__body">
                    <span className="stop-card__name">{s.name}</span>
                    <div className="stop-card__tags">
                      <span className="stop-card__spend">⏱ {s.spend}</span>
                      {s.hours && <span className="stop-card__hours">{s.hours}</span>}
                      {s.difficulty && <span className="stop-card__hours">רמת קושי: {s.difficulty}</span>}
                      {s.price && <span className="stop-card__hours">{s.price}</span>}
                      {s.accessible && <span className="stop-card__hours">♿ נגיש</span>}
                    </div>
                    {s.note && <p className="stop-card__note">{s.note}</p>}
                    {isSafeHttpUrl(s.mapLink) && (
                      <a className="stop-card__map-link" href={s.mapLink} target="_blank" rel="noopener noreferrer">
                        פתיחה בגוגל מפות ↗
                      </a>
                    )}
                  </div>
                </div>
                {i < route.stops.length - 1 && s.travel && (
                  <div className="timeline__travel">
                    <span style={{ fontSize: 13 }}>↓</span>
                    <span>{s.travel}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="detail-actions">
          <div className="btn-primary" onClick={() => onToggleSave(route.id)}>
            {saved ? 'נשמר ✓' : 'שמירת המסלול'}
          </div>
          <div className="btn-secondary" onClick={() => onShare(route)}>שיתוף</div>
        </div>
      </div>
    </div>
  );
}
