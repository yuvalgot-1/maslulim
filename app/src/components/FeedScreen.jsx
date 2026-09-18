import RouteCard from './RouteCard.jsx';

export default function FeedScreen({ title, count, routes, saved, onOpen, onToggleSave, onOpenProfile, empty, onReset, onOpenTerms, onOpenInstall }) {
  return (
    <div className="feed">
      <div className="feed__title-row">
        <span className="feed__title">{title}</span>
        <span className="feed__count">{count} מסלולים</span>
      </div>

      {routes.map((r) => (
        <RouteCard key={r.id} route={r} saved={!!saved[r.id]} onOpen={onOpen} onToggleSave={onToggleSave} onOpenProfile={onOpenProfile} />
      ))}

      {empty && (
        <div className="feed__empty">
          לא מצאנו מסלול כזה.<br />נסו שם של מקום, אזור או "עם ילדים".
          {onReset && (<><br /><span className="link-action" onClick={onReset}>נקה את כל הסינונים</span></>)}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, margin: '8px 0 4px' }}>
        <span className="link-action" onClick={onOpenInstall}>הוספה למסך הבית</span>
        <span className="link-action" onClick={onOpenTerms}>תנאי שימוש</span>
      </div>
    </div>
  );
}
