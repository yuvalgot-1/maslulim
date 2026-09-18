export const CATEGORIES = {
  nature: { label: 'טבע', color: '#2E6B4F' },
  cafe: { label: 'קפה', color: '#8A6A3C' },
  food: { label: 'אוכל', color: '#A4503C' },
  view: { label: 'נוף', color: '#3C6A8A' },
};

export const COLLECTIONS = [
  { id: 'all', label: 'הכול' },
  { id: 'day', label: 'טיולי יום' },
  { id: 'kids', label: 'עם ילדים' },
  { id: 'water', label: 'ליד המים' },
  { id: 'rain', label: 'יום גשום' },
];

export const AREAS = ['גליל', 'גולן', 'מרכז', 'שרון', 'ירושלים', 'נגב', 'אילת'];

export const DIFFICULTY_LEVELS = ['קל', 'בינוני', 'קשה'];

export const INITIAL_ROUTES = [
  {
    id: 'kinneret',
    title: 'בוקר בכנרת, קפה בגליל וארוחה בשקיעה',
    area: 'גליל תחתון',
    author: 'יואב',
    distance: '18 ק״מ ממך',
    duration: 'יום שלם · 6–7 שעות',
    collections: ['day', 'water'],
    saves: 312,
    blurb:
      'מתחילים על המים כשעוד קריר, ממשיכים לקפה קטן בין המטעים, ומסיימים במסעדה עם נוף לעמק. מסלול רגוע, מתאים גם למי שלא אוהב ללכת הרבה.',
    stops: [
      { name: 'חוף דוגית', cat: 'nature', spend: 'שעתיים', hours: '07:00–19:00', travel: '14 דק׳ נסיעה', note: 'חוף שקט בצד המזרחי. בואו לפני 9:00 ותקבלו אותו כמעט לעצמכם.' },
      { name: 'קפה במטע – כורסי', cat: 'cafe', spend: '45 דק׳', hours: '08:00–17:00', travel: '25 דק׳ נסיעה', note: 'מרפסת מוצלת, קפה טוב ומאפה שקדים. יש פינת מים לכלבים.' },
      { name: 'מסעדת ארבל', cat: 'food', spend: 'שעה וחצי', hours: '12:00–22:30', travel: '', note: 'להזמין מקום ליד החלון בשעה שלפני השקיעה. המנות לשיתוף הן העיקר.' },
    ],
  },
  {
    id: 'golan',
    title: 'מעיינות הגולן, יקב ומרפסת נוף',
    area: 'רמת הגולן',
    author: 'יואב',
    distance: '42 ק״מ ממך',
    duration: 'יום שלם · 5 שעות',
    collections: ['day', 'water'],
    saves: 174,
    blurb: 'מסלול מים קצר שמסתיים בטעימות ובנוף לחרמון. אפשר לעשות את הכל ברכב אחד, בלי הליכות ארוכות.',
    stops: [
      { name: 'נחל זוויתן התחתון', cat: 'nature', spend: 'שעה וחצי', hours: '08:00–16:00', travel: '20 דק׳ נסיעה', note: 'ירידה קלה למים, נעליים שנרטבות. בקיץ המים נעימים.' },
      { name: 'יקב אודם', cat: 'cafe', spend: 'שעה', hours: '10:00–18:00', travel: '12 דק׳ נסיעה', note: 'טעימות בלי הזמנה מראש בימי חול. גם מי שלא שותה יקבל שם קפה מעולה.' },
      { name: 'מרפסת נוף בנמרוד', cat: 'view', spend: '40 דק׳', hours: 'תמיד פתוח', travel: '', note: 'עצירה אחרונה לפני החזרה, בעיקר בשעה הזהובה.' },
    ],
  },
  {
    id: 'benshemen',
    title: 'יער בן שמן עם ילדים ופיצה בדרך חזרה',
    area: 'מרכז',
    author: 'יואב',
    distance: '9 ק״מ ממך',
    duration: 'חצי יום · 3–4 שעות',
    collections: ['kids', 'day'],
    saves: 96,
    blurb: 'מסלול קצר ושטוח שעובד גם עם עגלה, עם מתקנים באמצע וסיום שכולם מסכימים עליו.',
    stops: [
      { name: 'חניון המעגלים', cat: 'nature', spend: 'שעה', hours: 'תמיד פתוח', travel: '7 דק׳ נסיעה', note: 'שולחנות פיקניק בצל ומסלול מעגלי קצר. יש שירותים בחניון.' },
      { name: 'פינת חי בבן שמן', cat: 'nature', spend: '45 דק׳', hours: '09:00–16:00', travel: '15 דק׳ נסיעה', note: 'קטן אבל מספיק. אפשר להאכיל, כדאי להביא גזר.' },
      { name: 'פיצה בשוהם', cat: 'food', spend: 'שעה', hours: '11:00–23:00', travel: '', note: 'יושבים בחוץ, הילדים רצים בכיכר וההורים סוף סוף יושבים.' },
    ],
  },
  {
    id: 'alexander',
    title: 'שקיעה בנחל אלכסנדר ודגים בחוף',
    area: 'שרון',
    author: 'יואב',
    distance: '23 ק״מ ממך',
    duration: 'אחר הצהריים · 3 שעות',
    collections: ['water'],
    saves: 0,
    blurb: 'מסלול קצר לאחר הצהריים: צבי מים, שקיעה ודגים על הגריל. עובד מעולה גם ביום חורף בהיר.',
    stops: [
      { name: 'גשר הצבים', cat: 'nature', spend: 'שעה', hours: 'תמיד פתוח', travel: '18 דק׳ נסיעה', note: 'הצבים יוצאים לרוב אחרי הצהריים. שביל נוח לגמרי.' },
      { name: 'חוף בית ינאי', cat: 'view', spend: 'שעה', hours: 'תמיד פתוח', travel: '5 דק׳ נסיעה', note: 'נשארים לשקיעה מעל המצוק, לא על החוף עצמו.' },
      { name: 'מסעדת דגים בחוף', cat: 'food', spend: 'שעה וחצי', hours: '12:00–22:00', travel: '', note: 'סלטים, דג שלם ולחם חם. שווה להזמין מראש בסופ״ש.' },
    ],
  },
];

export const INITIAL_PUBLISHED = {
  kinneret: true,
  golan: true,
  benshemen: true,
  alexander: false,
};
