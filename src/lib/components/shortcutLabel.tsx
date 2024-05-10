import { Component } from "solid-js";
import { Card } from "./ui/card";
import { Shortcut } from "../utilities/shortcut";

const ShortcutLabel: Component<{
  for: Shortcut;
  class?: string;
}> = (props) => {
  const isMac = navigator.userAgent.toLowerCase().includes("mac");
  const keyList = props.for.keyCombination.map((key, i) => {
    if (i === props.for.keyCombination.length - 1) return key.toUpperCase();
    if (key === "shift") return "⇧";
    if (key === "alt") return isMac ? "⌥" : "Alt";
    if (key === "strictCtrl") return "⌃";
    return isMac ? "⌘" : "Ctrl";
  });
  return (
    <div class={props.class + " flex gap-1 ml-auto text-xs"}>
      {keyList.map((key) => (
        <Card class="px-[0.1em] py-[0.2em] min-w-5 text-center rounded-sm bg-muted text-muted-foreground">
          {key}
        </Card>
      ))}
    </div>
  );
};

export default ShortcutLabel;
