import { createRoot, createSignal, onCleanup, onMount } from "solid-js";

// ctrl is cmd on mac, alt is option on mac, strictCtrl is ctrl on both on windows and mac
type Modifier = "ctrl" | "shift" | "alt" | "strictCtrl";
type KeyCombination = [...Modifier[], Modifier, string];
export type Shortcut = {
  callback?: () => any;
  dispose: () => void;
  keyCombination: KeyCombination;
};
const shortcuts = new Map<string, Shortcut>();

/**
 * Create a new shortcut. The shortcut will automatically be disposed when the component is unmounted
 * @param keyCombination The key combination for the shortcut
 * @param callback The callback to run when the shortcut is triggered
 * @returns The created shortcut
 */
export default function createShortcut(
  keyCombination: KeyCombination,
  callback?: () => any
): Shortcut {
  const id = keyCombination.join("+");
  const previousShortcut = shortcuts.get(id);
  const dispose = onCleanup(() => {
    if (previousShortcut) shortcuts.set(id, previousShortcut);
    else shortcuts.delete(id);
  });
  const shortcut = { keyCombination, callback, dispose };
  shortcuts.set(id, shortcut);
  return shortcut;
}

createRoot(() => {
  onMount(() => {
    window.addEventListener("keydown", (e) => {
      const isMac = navigator.userAgent.toLowerCase().includes("mac");
      shortcuts.forEach((shortcut) => {
        const keys = shortcut.keyCombination;
        for (const mod of keys.slice(0, -1)) {
          if (mod === "ctrl" && !(isMac ? e.metaKey : e.ctrlKey)) return;
          if (mod === "shift" && !e.shiftKey) return;
          if (mod === "alt" && !e.altKey) return;
          if (mod === "strictCtrl" && !e.ctrlKey) return;
        }
        if (e.key !== keys[keys.length - 1]) return;
        e.preventDefault();
        shortcut.callback?.();
      });
    });
  });
});
