export default function TermsScreen({ onBack }) {
  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">תנאי שימוש</span>
        <span className="link-action" style={{ marginTop: 6 }} onClick={onBack}>
          חזרה
        </span>
      </div>

      <div className="builder-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <section>
          <p className="detail-blurb" style={{ margin: 0 }}>
            "מיטיבי לסת" הוא אתר להמלצות מסלולי טיול, המיועד לשימוש אישי ולא מסחרי.
            השימוש באתר כפוף לתנאים הבאים.
          </p>
        </section>

        <section>
          <span className="add-stop__title">אין אחריות על תוכן המסלולים</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            הפרטים במסלולים (שעות פתיחה, מחירים, נגישות, מצב השטח וכדומה) עשויים
            להשתנות ואינם מעודכנים בהכרח. יש לבדוק מידע קריטי מול המקור לפני היציאה
            לטיול. היציאה למסלולים ולאתרים המומלצים היא באחריות המשתמש בלבד.
          </p>
        </section>

        <section>
          <span className="add-stop__title">פרטיות ושמירת מידע</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            האתר אינו אוסף פרטים מזהים מבקרים. מסלולים ששמרתם (♡) נשמרים באחסון
            המקומי של הדפדפן שלכם בלבד ואינם נשלחים לשרת או משותפים עם אף אחד.
          </p>
        </section>

        <section>
          <span className="add-stop__title">תוכן ובעלות</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            המסלולים, התיאורים והתמונות נוצרים ומפורסמים על ידי מפעילי האתר, ואינם
            מועתקים ממקורות אחרים ללא רשות. אין להעתיק או להשתמש בתוכן האתר
            למטרות מסחריות ללא אישור.
          </p>
        </section>

        <section>
          <span className="add-stop__title">מפות וקישורים חיצוניים</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            תצוגת המפה בעמוד המסלול היא איור להמחשה בלבד ואינה מפה מדויקת. קישורי
            "פתיחה בגוגל מפות" מובילים לאתר חיצוני שאינו בבעלות האתר ואינו באחריותו,
            ושם חלים תנאי השימוש של אותו אתר.
          </p>
        </section>

        <section>
          <span className="add-stop__title">שינויים</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            תנאי השימוש עשויים להתעדכן מעת לעת. המשך השימוש באתר מהווה הסכמה
            לתנאים המעודכנים.
          </p>
        </section>
      </div>
    </div>
  );
}
