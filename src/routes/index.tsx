import Menu from "../lib/components/menu";
import DataTableDemo from "../lib/components/dataTableDemo";
import { icons } from "lucide-solid";
import { Button } from "~/lib/components/ui/button";
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
  DropdownMenuCheckboxItem,
} from "~/lib/components/ui/dropdown-menu";
import { i18n } from "~/main/i18n";
import ShortcutLabel from "~/lib/components/shortcutLabel";
import addShortcut from "~/lib/utilities/shortcut";
import { darkMode, setDarkMode } from "~/lib/utilities/theme";

export default function Index() {
  const profile = addShortcut(["shift", "ctrl", "p"]);
  const billing = addShortcut(["ctrl", "b"], () => console.log("Billing"));
  const settings = addShortcut(["ctrl", "s"]);
  const newTeam = addShortcut(["ctrl", "t"]);
  const logout = addShortcut(["shift", "ctrl", "q"]);

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
                    <ShortcutLabel for={profile} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:credit-card mr-2" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>
                    <ShortcutLabel for={billing} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i class="i-lucide:settings mr-2" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>
                    <ShortcutLabel for={settings} />
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
                <DropdownMenuItem onclick={newTeam.callback}>
                  <i class="i-lucide:plus mr-2" />
                  <span>New Team</span>
                  <DropdownMenuShortcut>
                    <ShortcutLabel for={newTeam} />
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
                  <DropdownMenuCheckboxItem
                    checked={darkMode()}
                    onClick={() => setDarkMode(true)}
                  >
                    {i18n.t({ en: "Dark", nl: "Donker" })()}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={!darkMode()}
                    onClick={() => setDarkMode(false)}
                  >
                    {i18n.t({ en: "Light", nl: "Licht" })()}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <i class="i-lucide:log-out mr-2" />
                <span>Log out</span>
                <DropdownMenuShortcut>
                  <ShortcutLabel for={logout} />
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
