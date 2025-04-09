import { createSignal, observable, Signal } from "solid-js";

export function createLocalStoredSignal<T>(
  key: string,
  _default: T,
  des: (v: string) => T,
  ser: (v: T) => string,
): Signal<T> {
  let prevValue: T = _default;
  try {
    const stored = window.localStorage.getItem(key);

    if (stored) {
      prevValue = des(stored);
    }
  } catch (e) {
    // Just log error for debug, but continue
    console.error(e);
  }

  const [value, setValue] = createSignal(prevValue);

  observable(value).subscribe((value) => {
    if (value != null) {
      window.localStorage.setItem(key, ser(value));
    } else {
      window.localStorage.removeItem(key);
    }
  });

  return [value, setValue];
}
