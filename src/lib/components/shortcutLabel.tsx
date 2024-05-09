import { Component } from "solid-js";
import { Card } from "./ui/card";

const ShortcutLabel: Component<{
  for: {
    keyList: (() => string)[];
    callback?: () => any;
  };
  class?: string;
}> = (props) => {
  return (
    <div class={props.class + " flex gap-1"}>
      {props.for.keyList.map((Key) => (
        <Card class="px-[0.1em] py-[0.2em] min-w-5 text-center rounded-sm bg-muted">
          <Key />
        </Card>
      ))}
    </div>
  );
};

export default ShortcutLabel;
