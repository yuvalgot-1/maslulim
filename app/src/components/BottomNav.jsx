import { press } from '../utils/a11y.js';
import Icon from './Icon.jsx';

export default function BottomNav({ mode, screen, onNavigate }) {
  const tabs = mode === 'creator'
    ? [
        { id: 'mine', label: 'המסלולים שלי', icon: 'list' },
        { id: 'build', label: 'מסלול חדש', icon: 'plus' },
        { id: 'feed', label: 'תצוגה ציבורית', icon: 'explore' },
        { id: 'account', label: 'חשבון', icon: 'user' },
      ]
    : [
        { id: 'feed', label: 'גלו מסלולים', icon: 'explore' },
        { id: 'saved', label: 'שמורים', icon: 'heart' },
        { id: 'account', label: 'חשבון', icon: 'user' },
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
            <span className="bottom-nav__icon"><Icon name={t.icon} /></span>
            <span className="bottom-nav__label">{t.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
