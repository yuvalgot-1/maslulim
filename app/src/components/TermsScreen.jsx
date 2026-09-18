import { press } from '../utils/a11y.js';

export default function TermsScreen({ onBack }) {
  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">תנאי שימוש</span>
        <span className="link-action" style={{ marginTop: 6 }} {...press(onBack)}>
          חזרה
        </span>
      </div>

      <div className="builder-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <section>
          <p className="detail-blurb" style={{ margin: 0 }}>
            ברוכים הבאים ל"מיטיבי לסת", אתר המלצות למסלולי טיול (להלן: "האתר"). האתר
            מיועד לשימוש אישי ולא מסחרי בלבד. השימוש באתר כפוף לתנאים המפורטים
            להלן, ועצם הגלישה בו מהווה את הסכמתך לתנאים אלו.
          </p>
        </section>

        <section>
          <span className="add-stop__title">1. היעדר אחריות על תוכן ומסלולי טיול</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            המידע והמסלולים באתר מוגשים כמו שהם ובגדר המלצה בלבד. הפרטים במסלולים
            (לרבות תוואי השטח, שעות פתיחה, מחירים ונגישות) עשויים להשתנות ואינם
            מעודכנים בהכרח.
          </p>
          <p className="detail-blurb" style={{ margin: '10px 0 0' }}>
            היציאה למסלולים ולאתרים המומלצים היא על אחריותו הבלעדית של המשתמש.
            מפעילי האתר לא יישאו בכל אחריות לכל נזק, ישיר או עקיף, נזק גוף, רכוש,
            פציעה או חלילה מוות, שייגרמו כתוצאה מהסתמכות על המידע המופיע באתר,
            טעויות בניווט, שינויים בתנאי השטח או פגעי מזג אוויר.
          </p>
          <p className="detail-blurb" style={{ margin: '10px 0 0' }}>
            על המטייל לוודא את התנאים בשטח, להצטייד בציוד ומים בהתאם לנדרש, ולהפעיל
            שיקול דעת עצמאי.
          </p>
        </section>

        <section>
          <span className="add-stop__title">2. המלצות קולינריות ומזון</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            היות והאתר משלב המלצות בתחומי המזון והקולינריה, מובהר בזאת כי מפעילי
            האתר אינם נושאים באחריות לאיכות המזון המוגש בבתי העסק, עמידה בתקני
            היגיינה, תעודות כשרות או שינויים ברכיבי המנות. האחריות על בירור אלרגיות,
            רגישויות וסוגיות תזונתיות מוטלת על המשתמש בלבד, ויש לבדוק זאת ישירות
            מול בית העסק טרם צריכת המזון.
          </p>
        </section>

        <section>
          <span className="add-stop__title">3. פרטיות ושמירת מידע</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            האתר מכבד את פרטיותך ואינו אוסף פרטים אישיים מזהים של המבקרים.
          </p>
          <p className="detail-blurb" style={{ margin: '10px 0 0' }}>
            <b>אחסון מקומי:</b> מסלולים ששמרתם (♡) נשמרים באחסון המקומי של הדפדפן
            שלכם (Local Storage) בלבד, אינם נשלחים לשרת ואינם משותפים עם אף גורם.
          </p>
          <p className="detail-blurb" style={{ margin: '10px 0 0' }}>
            <b>תשתיות צד-שלישי:</b> האתר מאוחסן על גבי פלטפורמות ענן (כגון GitHub
            Pages). כחלק מהפעילות התקינה של שרתים אלו, ייתכן ונאספים נתונים טכניים
            סטטיסטיים ואנונימיים (כגון כתובת IP וזמני כניסה) הכפופים למדיניות
            הפרטיות של ספקיות האחסון.
          </p>
        </section>

        <section>
          <span className="add-stop__title">4. תוכן, קניין רוחני וזכויות יוצרים</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            המסלולים, הטקסטים והעיצובים נוצרים ומפורסמים על ידי מפעילי האתר. אין
            להעתיק, לשכפל או להשתמש בתוכן למטרות מסחריות ללא קבלת אישור מראש
            ובכתב. שימוש במפות חיצוניות המשובצות באתר כפוף לתנאי השימוש וזכויות
            היוצרים של ספקיות המפות.
          </p>
          <p className="detail-blurb" style={{ margin: '10px 0 0' }}>
            לגבי המפה המוצגת בעמוד המסלול עצמו: זו איור להמחשה בלבד ואינה מפה
            מדויקת. קישורי "פתיחה בגוגל מפות" מובילים לאתר חיצוני שאינו בבעלות האתר
            ואינו באחריותו.
          </p>
        </section>

        <section>
          <span className="add-stop__title">5. שינויים בתנאי השימוש</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            מפעילי האתר שומרים לעצמם את הזכות לעדכן את תנאי השימוש מעת לעת. המשך
            השימוש באתר מהווה הסכמה לתנאים המעודכנים.
          </p>
        </section>

        <section>
          <span className="add-stop__title">6. דין וסמכות שיפוט</span>
          <p className="detail-blurb" style={{ margin: '6px 0 0' }}>
            על תנאי שימוש אלו יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית בכל
            עניין או סכסוך הנוגע לאתר תהיה נתונה לבתי המשפט המוסמכים במדינת ישראל.
          </p>
        </section>
      </div>
    </div>
  );
}
