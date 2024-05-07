import Menu from "../components/menu";
import DataTableDemo from "../components/dataTableDemo";
import { icons } from "lucide-solid";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Index() {
  return (
    <div class="flex h-full w-full">
      <Menu />
      <main class="pt-5 pb-5 px-10 grow flex flex-col">
        <div class="flex justify-between items-end pb-5">
          <h1 class="text-2xl font-semibold">Artikelen</h1>
          <Button
            variant="outline"
            class="p-2 rounded-full h-[unset] text-muted-foreground"
          ></Button>

          <DropdownMenu placement="bottom-start">
            <DropdownMenuTrigger
              as={(props) => (
                <Button
                  variant="outline"
                  class="p-2 rounded-full h-[unset] text-muted-foreground"
                  {...props}
                >
                  <icons.User />
                </Button>
              )}
            />
            <DropdownMenuContent class="w-56">
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>My Account</DropdownMenuGroupLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <i class="i-lucide:user mr-2" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:credit-card mr-2" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:settings mr-2" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:keyboard mr-2" />
                  <span>Keyboard shortcuts</span>
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <i class="i-lucide:user mr-2" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <i class="i-lucide:user-plus mr-2" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <i class="i-lucide:mail mr-2" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <i class="i-lucide:message-square mr-2" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <i class="ilucide:plus-circle mr-2" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <i class="i-lucide:plus mr-2" />
                  <span>New Team</span>
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <i class="i-lucide:github mr-2" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <i class="i-lucide:life-buoy mr-2" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <i class="i-lucide:cloud mr-2" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <i class="i-lucide:log-out mr-2" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DataTableDemo />
      </main>
    </div>
  );
}
