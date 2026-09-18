import { useState } from 'react';

const PREFIX = 'maslulim:';

function read(key, initialValue) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : initialValue;
  } catch {
    return initialValue;
  }
}

export function moveLocalStorageValue(fromKey, toKey) {
  try {
    const raw = window.localStorage.getItem(PREFIX + fromKey);
    if (raw) window.localStorage.setItem(PREFIX + toKey, raw);
    window.localStorage.removeItem(PREFIX + fromKey);
  } catch {
    // storage full or unavailable — nothing to migrate
  }
}

export function useLocalStorageState(key, initialValue, onPersistError) {
  const [value, setValue] = useState(() => read(key, initialValue));

  const setAndPersist = (next) => {
    setValue((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      try {
        window.localStorage.setItem(PREFIX + key, JSON.stringify(resolved));
      } catch {
        // storage full or unavailable — keep working in memory
        onPersistError?.();
      }
      return resolved;
    });
  };

  return [value, setAndPersist];
}
