import ImageSlot from './ImageSlot.jsx';

export default function MyRoutesScreen({ routes, published, onTogglePublish, onEdit }) {
  const pubCount = routes.filter((r) => published[r.id]).length;
  const stats = [
    { value: pubCount, label: 'מפורסמים' },
    { value: routes.length - pubCount, label: 'טיוטות' },
  ];

  return (
    <div className="mine">
      <div className="mine__heading">
        <span className="mine__title">המסלולים שלי</span>
        <span className="mine__summary">{pubCount} מפורסמים · {routes.length - pubCount} טיוטות</span>
      </div>

      <div className="stats-row">
        {stats.map((st, i) => (
          <div className="stat-card" key={i}>
            <span className="stat-card__value">{st.value}</span>
            <span className="stat-card__label">{st.label}</span>
          </div>
        ))}
      </div>

      {routes.map((r) => {
        const isPub = !!published[r.id];
        return (
          <div className="mine-card" key={r.id}>
            <div className="mine-card__thumb">
              <ImageSlot id={'cover-' + r.id} placeholder="תמונה" />
            </div>
            <div className="mine-card__info">
              <span className="mine-card__title">{r.title}</span>
              <span className="mine-card__meta">{r.area} · {r.stops.length} תחנות · {r.duration}</span>
              <div className="mine-card__row">
                <span className={'badge ' + (isPub ? 'badge--published' : 'badge--draft')}>
                  {isPub ? 'מפורסם' : 'טיוטה'}
                </span>
                <button className="link-action" onClick={() => onEdit(r)}>עריכה</button>
                <button className="link-action" onClick={() => onTogglePublish(r.id)}>
                  {isPub ? 'הסרה מפרסום' : 'פרסום עכשיו'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
