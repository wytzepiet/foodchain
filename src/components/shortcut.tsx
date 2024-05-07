import { Component, For } from "solid-js";
import { Card } from "./ui/card";

// ctrl is cmd on mac, alt is option on mac, strictCtrl is ctrl on both on windows and mac
type Modifier = "ctrl" | "shift" | "alt" | "strictCtrl";
type KeyCombination = [...Modifier[], string];

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

export class Shortcut {
  callback?: () => any;
  keyCombination: string[];
  protected listener: (e: KeyboardEvent) => void;
  protected enabled = false;

  constructor(keyCombination: KeyCombination, callback?: () => any) {
    this.callback = callback;

    const isMac = navigator.userAgent.includes("Mac OS X");

    this.keyCombination = keyCombination.map((key, i) => {
      if (i === keyCombination.length - 1) return key.toUpperCase();
      if (key === "shift") return "⇧";
      if (key === "alt") return isMac ? "⌥" : "Alt";
      if (key === "strictCtrl") return "⌃";
      return isMac ? "⌘" : "^";
    });

    const modifierKeys = keyCombination.slice(0, -1);

    this.listener = (e: KeyboardEvent) => {
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

    this.enable();
  }

  enable() {
    if (typeof document === "undefined") {
      setTimeout(() => this.enable(), 10);
      return;
    }
    if (this.enabled) return;
    document.addEventListener("keydown", this.listener);
    this.enabled = true;
  }

  disable() {
    if (!this.enabled) return;

    document.removeEventListener("keydown", this.listener);
    this.enabled = false;
  }
}
