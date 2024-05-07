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
import { i18n } from "~/main/i18n";
import { Shortcut, ShortcutLabel } from "~/components/shortcut";

export default function Index() {
  const profile = new Shortcut(["shift", "ctrl", "p"]);
  const billing = new Shortcut(["ctrl", "p"]);
  const settings = new Shortcut(["ctrl", "s"]);
  const keyboardShortcuts = new Shortcut(["ctrl", "k"]);
  const newTeam = new Shortcut(["ctrl", "t"]);
  const logout = new Shortcut(["shift", "ctrl", "q"]);

  return (
    <div class="flex h-full w-full">
      <Menu />
      <main class="pt-5 pb-5 px-10 grow flex flex-col">
        <div class="flex justify-between items-end pb-5">
          <h1 class="text-2xl font-semibold">Artikelen</h1>

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
                  <DropdownMenuShortcut>
                    <ShortcutLabel shortcut={profile} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:credit-card mr-2" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>
                    <ShortcutLabel shortcut={billing} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:settings mr-2" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>
                    <ShortcutLabel shortcut={settings} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:keyboard mr-2" />
                  <span>Keyboard shortcuts</span>
                  <DropdownMenuShortcut>
                    <ShortcutLabel shortcut={keyboardShortcuts} />
                  </DropdownMenuShortcut>
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
                  <DropdownMenuShortcut>
                    <ShortcutLabel shortcut={newTeam} />
                  </DropdownMenuShortcut>
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
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <i class="i-lucide:user-plus mr-2" />
                  <span>{i18n.t({ en: "Theme", nl: "Thema" })()}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => document.body.classList.add("dark")}
                  >
                    <i class="i-lucide:mail mr-2" />
                    <span>{i18n.t({ en: "Dark", nl: "Donker" })()}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => document.body.classList.remove("dark")}
                  >
                    <i class="i-lucide:message-square mr-2" />
                    <span>{i18n.t({ en: "Light", nl: "Licht" })()}</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <i class="i-lucide:log-out mr-2" />
                <span>Log out</span>
                <DropdownMenuShortcut>
                  <ShortcutLabel shortcut={logout} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DataTableDemo />
      </main>
    </div>
  );
}
