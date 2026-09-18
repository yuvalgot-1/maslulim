export default function InstallScreen({ onBack, installPrompt, onInstall, installed }) {
  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  const ios = (
    <div className="builder-card install-steps">
      <span className="install-steps__title">באייפון (Safari)</span>
      <ol>
        <li>פתחו את האתר ב־Safari (לא בתוך וואטסאפ או אפליקציה אחרת).</li>
        <li>לחצו על כפתור השיתוף (ריבוע עם חץ למעלה).</li>
        <li>גללו ובחרו <b>"הוסף למסך הבית"</b>.</li>
        <li>לחצו <b>"הוסף"</b>.</li>
      </ol>
    </div>
  );

  const android = (
    <div className="builder-card install-steps">
      <span className="install-steps__title">באנדרואיד (Chrome)</span>
      <ol>
        <li>פתחו את האתר ב־Chrome.</li>
        <li>לחצו על שלוש הנקודות בפינה.</li>
        <li>בחרו <b>"התקנת אפליקציה"</b> או <b>"הוספה למסך הבית"</b>.</li>
        <li>אשרו, והאייקון יופיע במסך הבית.</li>
      </ol>
    </div>
  );

  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">הוספה למסך הבית</span>
        <span className="builder__progress">כך האתר נפתח כמו אפליקציה, בלי שורת כתובת.</span>
      </div>

      {installed && (
        <div className="builder-card" style={{ color: 'var(--link)', fontWeight: 700 }}>
          האתר כבר מותקן אצלכם ✓
        </div>
      )}

      {!installed && installPrompt && (
        <button
          type="button"
          className="publish-btn"
          style={{ background: 'var(--bg-header)', border: 'none', width: '100%' }}
          onClick={onInstall}
        >
          התקנה בלחיצה אחת
        </button>
      )}

      {isIos ? <>{ios}{android}</> : <>{android}{ios}</>}

      <span className="link-action" style={{ textAlign: 'center' }} onClick={onBack}>חזרה</span>
    </div>
  );
}
