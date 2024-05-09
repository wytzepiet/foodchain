import { createSignal, onMount } from "solid-js";

// ctrl is cmd on mac, alt is option on mac, strictCtrl is ctrl on both on windows and mac
type Modifier = "ctrl" | "shift" | "alt" | "strictCtrl";
type KeyCombination = [...Modifier[], string];

const shortcutMap = new Map<
  string,
  { keyDown: (e: KeyboardEvent) => void; disposeOnNavigate: boolean }
>();
const [isMac, setIsMac] = createSignal(false);

export default function addShortcut(
  keyCombination: KeyCombination,
  callback?: () => any
) {
  const keyList = keyCombination.map((key, i) => {
    if (i === keyCombination.length - 1) return () => key.toUpperCase();
    if (key === "shift") return () => "⇧";
    if (key === "alt") return () => (isMac() ? "⌥" : "Alt");
    if (key === "strictCtrl") return () => "⌃";
    return () => (isMac() ? "⌘" : "^");
  });

  const modifierKeys = keyCombination.slice(0, -1);

  const keyDown = (e: KeyboardEvent) => {
    for (const mod of modifierKeys) {
      if (mod === "ctrl" && !(isMac() ? e.metaKey : e.ctrlKey)) return;
      if (mod === "shift" && !e.shiftKey) return;
      if (mod === "alt" && !e.altKey) return;
      if (mod === "strictCtrl" && !e.ctrlKey) return;
    }
    if (e.key !== keyCombination[keyCombination.length - 1]) return;
    e.preventDefault();
    callback?.();
  };

  const key = keyCombination.join("+");

  if (!shortcutMap.has(key))
    shortcutMap.set(key, { keyDown, disposeOnNavigate: true });
  else console.warn(`Failed to add shortcut ${key}: shortcut already exists`);

  return { keyList, callback };
}

onMount(() => {
  setIsMac(navigator.userAgent.toLowerCase().includes("mac"));
  window.addEventListener("keydown", (e) => {
    shortcutMap.forEach((shortcut) => shortcut.keyDown(e));
  });
});
