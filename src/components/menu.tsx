import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import UserSelect from "./userSelect";
import menu from "~/main/menu";

const Menu = () => {
  return (
    <div class="pt-4 px-3 h-full bg-background border-r">
      <UserSelect />
      <Accordion collapsible class="px-1">
        {menu.map((item, i) => (
          <AccordionItem value={"menu-item-" + i}>
            <AccordionTrigger>
              <a class="!justify-start w-full flex gap-3 py-2" href={item.href}>
                <item.icon class="h-5 w-5" />
                {item.title()}
              </a>
            </AccordionTrigger>
            <AccordionContent>
              <div class="flex flex-col gap-1 pl-4">
                {item.items.map((subItem) => (
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
  );
};

export default Menu;
