import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/lib/components/ui/command";
import { Button, buttonVariants } from "~/lib/components/ui/button";
import menu from "~/main/menu";
import { Image, ImageFallback, ImageRoot } from "~/lib/components/ui/image";
import ShortcutLabel from "./shortcutLabel";
import createShortcut from "~/lib/utilities/shortcut";
import { createSignal } from "solid-js";
import { i18n } from "~/main/i18n";
import { icons } from "lucide-solid";

const Menu = () => {
  const [open, setOpen] = createSignal(false);
  const quickNavigation = createShortcut(["ctrl", "k"], () => {
    setOpen((open) => !open);
  });

  return (
    <>
      <div class="pt-4 px-3 h-full bg-card border-r flex flex-col justify-between pb-4">
        <div class="flex flex-col items-center gap-5">
          <ImageRoot class="size-16 self-center rounded-md">
            <Image src="/actifood.png" />
            <ImageFallback>VHC</ImageFallback>
          </ImageRoot>

          <Accordion collapsible class="px-1">
            {menu.map((item, i) => (
              <AccordionItem value={"menu-item-" + (i + 1)}>
                <AccordionTrigger>
                  <a
                    class="!justify-start w-full flex gap-3 py-2"
                    href={item.href}
                  >
                    <item.icon class="h-5 w-5" />
                    {item.title()}
                  </a>
                </AccordionTrigger>
                <AccordionContent>
                  <div class="flex flex-col gap-1 pl-4">
                    {item.items?.map((subItem) => (
                      <a
                        class={`!justify-start ${buttonVariants({
                          variant: "ghost",
                        })}`}
                        href={subItem.href}
                      >
                        {subItem.title()}
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <Button
          variant="ghost"
          class="justify-self-end flex gap-4 justify-between"
        >
          <span>Snel Navigeren</span>
          <ShortcutLabel for={quickNavigation} />
        </Button>
      </div>

      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>{i18n.message.noResultsFound()}</CommandEmpty>
          {menu.map((item) => (
            <CommandGroup
              heading={
                <div class="flex gap-2">
                  <item.icon class="h-4 w-4" />
                  {item.title()}
                </div>
              }
            >
              {item.items?.map((subItem) => (
                <CommandItem>{subItem.title()}</CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Menu;
