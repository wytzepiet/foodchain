import { Component, For } from "solid-js";
import { Card } from "./ui/card";

// ctrl is cmd on mac, alt is option on mac, strictCtrl is ctrl on both on windows and mac
type Modifier = "ctrl" | "shift" | "alt" | "strictCtrl";
type KeyCombination = [...Modifier[], string];
type Shortcut = {
  keyCombination: string[];
  keyDown: (e: KeyboardEvent) => void;
  disposeOnNavigate: boolean;
};

export const ShortcutLabel: Component<{ shortcut: Shortcut }> = (props) => {
  return (
    <div class="flex gap-1">
      {props.shortcut.keyCombination.map((key) => (
        <Card class="px-[0.1em] py-[0.2em] min-w-5 text-center rounded-sm bg-muted">
          {key}
        </Card>
      ))}
    </div>
  );
};

const shortcutMap = new Map<string, Shortcut>();

export function initializeShortcuts() {
  window.addEventListener("keydown", (e) => {
    shortcutMap.forEach((shortcut) => shortcut.keyDown(e));
  });
}

export function addShortcut(
  keyCombination: KeyCombination,
  callback?: () => any
): Shortcut {
  const isMac = navigator.userAgent.includes("Mac OS X");

  const keys = keyCombination.map((key, i) => {
    if (i === keyCombination.length - 1) return key.toUpperCase();
    if (key === "shift") return "⇧";
    if (key === "alt") return isMac ? "⌥" : "Alt";
    if (key === "strictCtrl") return "⌃";
    return isMac ? "⌘" : "^";
  });

  const modifierKeys = keyCombination.slice(0, -1);

  const keyDown = (e: KeyboardEvent) => {
    for (const mod of modifierKeys) {
      if (mod === "ctrl" && !(isMac ? e.metaKey : e.ctrlKey)) return;
      if (mod === "shift" && !e.shiftKey) return;
      if (mod === "alt" && !e.altKey) return;
      if (mod === "strictCtrl" && !e.ctrlKey) return;
    }
    if (e.key !== keyCombination[keyCombination.length - 1]) return;
    e.preventDefault();
    callback?.();
  };

  const key = keyCombination.join("+");
  if (shortcutMap.has(key)) return shortcutMap.get(key) as Shortcut;

  const result = { keyCombination: keys, keyDown, disposeOnNavigate: true };
  shortcutMap.set(key, result);
  return result;
}
