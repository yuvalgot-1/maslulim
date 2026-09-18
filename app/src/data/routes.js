export const CATEGORIES = {
  nature: { label: 'טבע', color: '#2E6B4F' },
  cafe: { label: 'קפה', color: '#8A6A3C' },
  food: { label: 'אוכל', color: '#A4503C' },
  view: { label: 'נוף', color: '#3C6A8A' },
};

export function getCategory(cat) {
  return CATEGORIES[cat] || CATEGORIES.nature;
}

export const COLLECTIONS = [
  { id: 'all', label: 'הכול' },
  { id: 'day', label: 'טיולי יום' },
  { id: 'kids', label: 'עם ילדים' },
  { id: 'water', label: 'ליד המים' },
  { id: 'rain', label: 'יום גשום' },
];

export const AREAS = ['גליל', 'גולן', 'מרכז', 'שרון', 'ירושלים', 'נגב', 'אילת'];

export const DIFFICULTY_LEVELS = ['קל', 'בינוני', 'קשה'];
