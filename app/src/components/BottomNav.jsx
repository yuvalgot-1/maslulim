import { press } from '../utils/a11y.js';

export default function BottomNav({ mode, screen, onNavigate }) {
  const tabs = mode === 'creator'
    ? [
        { id: 'mine', label: 'המסלולים שלי', icon: '☰' },
        { id: 'build', label: 'מסלול חדש', icon: '＋' },
        { id: 'feed', label: 'תצוגה ציבורית', icon: '◎' },
      ]
    : [
        { id: 'feed', label: 'גלו מסלולים', icon: '◎' },
        { id: 'saved', label: 'שמורים', icon: '♡' },
        { id: 'account', label: 'חשבון', icon: '☺' },
      ];

  return (
    <nav className="bottom-nav" aria-label="ניווט ראשי">
      {tabs.map((t) => {
        const active = screen === t.id || (t.id === 'feed' && (screen === 'detail' || screen === 'profile'));
        return (
          <div
            key={t.id}
            className={'bottom-nav__item' + (active ? ' bottom-nav__item--active' : '')}
            aria-current={active ? 'page' : undefined}
            {...press(() => onNavigate(t.id))}
          >
            <span className="bottom-nav__icon">{t.icon}</span>
            <span className="bottom-nav__label">{t.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
