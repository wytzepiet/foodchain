import Menu from "../components/menu";
import DataTableDemo from "../components/dataTableDemo";
import { icons } from "lucide-solid";
import { Button } from "~/components/ui/button";

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
          >
            <icons.User />
          </Button>
        </div>

        <DataTableDemo />
      </main>
    </div>
  );
}
