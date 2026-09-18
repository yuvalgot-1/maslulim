import RouteCard from './RouteCard.jsx';

export default function FeedScreen({ title, count, routes, saved, onOpen, onToggleSave, empty, onOpenTerms }) {
  return (
    <div className="feed">
      <div className="feed__title-row">
        <span className="feed__title">{title}</span>
        <span className="feed__count">{count} מסלולים</span>
      </div>

      {routes.map((r) => (
        <RouteCard key={r.id} route={r} saved={!!saved[r.id]} onOpen={onOpen} onToggleSave={onToggleSave} />
      ))}

      {empty && (
        <div className="feed__empty">
          לא מצאנו מסלול כזה.<br />נסו שם של מקום, אזור או "עם ילדים".
        </div>
      )}

      <span className="link-action" style={{ display: 'block', textAlign: 'center', margin: '8px 0 4px' }} onClick={onOpenTerms}>
        תנאי שימוש
      </span>
    </div>
  );
}
