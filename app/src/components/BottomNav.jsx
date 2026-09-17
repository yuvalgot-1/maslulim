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
      ];

  return (
    <div className="bottom-nav">
      {tabs.map((t) => {
        const active = screen === t.id || (t.id === 'feed' && screen === 'detail');
        return (
          <div
            key={t.id}
            className={'bottom-nav__item' + (active ? ' bottom-nav__item--active' : '')}
            onClick={() => onNavigate(t.id)}
          >
            <span className="bottom-nav__icon">{t.icon}</span>
            <span className="bottom-nav__label">{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}
