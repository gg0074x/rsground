import { observable } from "solid-js";
import { ThemeMode } from "../types";
import { createLocalStoredSignal } from "@utils/createLocalStoredSignal";

export const [themeMode, setThemeMode] = createLocalStoredSignal<ThemeMode>(
  "themeMode",
  ThemeMode.System,
  (v) => ThemeMode[v],
  (v) => ThemeMode[v],
);

const htmlRoot = document.getElementsByTagName("html")[0];
observable(themeMode).subscribe((themeMode) => {
  switch (themeMode) {
    case ThemeMode.System:
      delete htmlRoot.dataset["light"];
      delete htmlRoot.dataset["dark"];
      break;
    case ThemeMode.Light:
      htmlRoot.dataset["light"] = "";
      delete htmlRoot.dataset["dark"];
      break;
    case ThemeMode.Dark:
      delete htmlRoot.dataset["light"];
      htmlRoot.dataset["dark"] = "";
      break;
  }
});
