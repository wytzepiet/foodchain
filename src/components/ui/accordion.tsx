import { cn } from "~/components/ui/libs/cn";
import { Accordion as AccordionPrimitive } from "@kobalte/core";
import { splitProps } from "solid-js";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = (props: AccordionPrimitive.AccordionItemProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <AccordionPrimitive.Item class={cn(local.class)} {...rest} />;
};

export const AccordionTrigger = (
  props: AccordionPrimitive.AccordionTriggerProps
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <AccordionPrimitive.Header class="flex" as="div">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center gap-4 py-1 text-sm font-medium transition-shadow hover:underline focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring [&[data-expanded]>svg]:rotate-180",
          local.class
        )}
        {...rest}
      >
        <div class="grow">{local.children}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4 text-muted-foreground transition-transform duration-100"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m6 9l6 6l6-6"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export const AccordionContent = (
  props: AccordionPrimitive.AccordionContentProps
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <AccordionPrimitive.Content
      class={cn(
        "animate-accordion-up overflow-hidden text-sm data-[expanded]:animate-accordion-down",
        local.class
      )}
      {...rest}
    >
      <div class="pb-2 pt-0">{local.children}</div>
    </AccordionPrimitive.Content>
  );
};
