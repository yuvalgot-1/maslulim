import { press } from '../utils/a11y.js';

const STEPS = [
  {
    title: '1. מוצאים מסלול',
    text: 'בעמוד "גלו מסלולים" אפשר לחפש לפי שם, מקום או אזור. כפתורי "אזור" ו"סוג תחנה" והקולקציות (למשל "עם ילדים" או "ליד המים") עוזרים לצמצם את הרשימה.',
  },
  {
    title: '2. פותחים מסלול',
    text: 'לחיצה על כרטיס פותחת את המסלול כולו: התחנות לפי הסדר, כמה זמן כדאי להישאר בכל אחת, שעות פתיחה והמלצות של היוצר.',
  },
  {
    title: '3. יוצאים לדרך',
    text: 'הכפתור "פתיחת כל המסלול בגוגל מפות" מתחיל ניווט דרך כל התחנות. בכל תחנה אפשר גם לפתוח אותה בנפרד בגוגל מפות או ב־Waze.',
  },
  {
    title: '4. שומרים למועד אחר',
    text: 'לחצו על ♡ בכרטיס המסלול, והוא יחכה לכם בלשונית "שמורים". בלי חשבון השמירה נשארת במכשיר הזה. עם חשבון היא זמינה בכל מכשיר.',
  },
  {
    title: '5. משתפים',
    text: 'בתוך המסלול לחצו על "שיתוף" כדי לשלוח קישור ישיר לחברים, למשל בוואטסאפ.',
  },
  {
    title: '6. חשבון (לא חובה)',
    text: 'בלשונית "חשבון" אפשר להירשם בחינם, להתחבר ולאפס סיסמה. החשבון שומר את המסלולים השמורים שלכם בכל המכשירים.',
  },
  {
    title: '7. מוסיפים למסך הבית',
    text: 'כדי לפתוח את האתר כמו אפליקציה, לחצו על "הוספה למסך הבית" בתחתית המסך ובצעו את השלבים.',
  },
];

export default function GuideScreen({ onBack, onOpenInstall }) {
  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">איך משתמשים באתר</span>
        <span className="builder__progress">כל מה שצריך לדעת, בקצרה.</span>
      </div>

      {STEPS.map((s) => (
        <div className="builder-card install-steps" key={s.title}>
          <span className="install-steps__title">{s.title}</span>
          <span style={{ fontSize: 14, color: 'var(--text-body)' }}>{s.text}</span>
        </div>
      ))}

      <span className="link-action" style={{ textAlign: 'center' }} {...press(onOpenInstall)}>
        איך מוסיפים את האתר למסך הבית?
      </span>
      <span className="link-action" style={{ textAlign: 'center' }} {...press(onBack)}>חזרה</span>
    </div>
  );
}
