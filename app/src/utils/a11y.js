// Props that make a non-button element (div/span) work with keyboard and screen readers.
export function press(handler) {
  if (!handler) return {};
  return {
    role: 'button',
    tabIndex: 0,
    onClick: handler,
    onKeyDown: (e) => {
      // ignore keys pressed on a nested control (e.g. the save button inside a route card)
      if (e.target !== e.currentTarget) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
      }
    },
  };
}
