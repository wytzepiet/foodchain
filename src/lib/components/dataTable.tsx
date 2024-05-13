import { faker } from "@faker-js/faker";
import { As } from "@kobalte/core";
import { useSearchParams } from "@solidjs/router";
import type { Column, ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/solid-table";
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/solid-table";
import type { VoidProps } from "solid-js";
import { For, Show, createResource, createSignal, splitProps } from "solid-js";
import { z } from "zod";
import { Badge } from "~/lib/components/ui/badge";
import { Button } from "~/lib/components/ui/button";
import { Checkbox, CheckboxControl } from "~/lib/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/lib/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/lib/components/ui/table";
import { TextField, TextFieldInput } from "~/lib/components/ui/textfield";
import { icons } from "lucide-solid";
import { i18n } from "~/main/i18n";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/lib/components/ui/dropdown-menu";
import { Card } from "./ui/card";
import ShortcutLabel from "./shortcutLabel";
import createShortcut from "../utilities/shortcut";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/lib/components/ui/tooltip";
import type { TooltipTriggerProps } from "@kobalte/core/dist/types/tooltip";
import { supabase } from "../utilities/database/client";
import { QueryData } from "@supabase/supabase-js";

// type Task = {
//   id: string;
//   code: string;
//   title: string;
//   status: "todo" | "in-progress" | "done" | "cancelled";
//   label: "bug" | "feature" | "enhancement" | "documentation";
// };

// const makeData = (len: number) =>
//   Array.from({ length: len }, (_, i) => i).map(
//     (): Task => ({
//       id: faker.string.nanoid(),
//       code: `TASK-${faker.string.numeric({ length: 2 })}`,
//       title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//       status: faker.helpers.shuffle<Task["status"]>(["todo", "in-progress", "done", "cancelled"])[0] ?? "todo",
//       label: faker.helpers.shuffle<Task["label"]>(["bug", "feature", "enhancement", "documentation"])[0] ?? "bug",
//     })
//   );

const query = supabase.from("products").select().limit(50);
type Product = QueryData<typeof query>[0];

(async () => {
  const data = await query;
  console.log(data);
})();

const filteredStatusList = () =>
  ["todo", "in-progress", "done", "cancelled"].map((e) => ({
    title: e,
    value: e,
  }));

const TableColumnHeader = <TData, TValue>(props: VoidProps<{ column: Column<TData, TValue>; title: string }>) => {
  const [local] = splitProps(props, ["column", "title"]);

  return (
    <Show
      when={local.column.getCanSort() && local.column.getCanHide()}
      fallback={<span class="text-sm font-medium">{local.title}</span>}
    >
      <div class="flex items-center space-x-2">
        <Button
          variant="ghost"
          class="-ml-4 h-8 data-[expanded]:bg-accent flex gap-2"
          onclick={() => props.column.toggleSorting(undefined, true)}
        >
          <span>{local.title}</span>
          {local.column.getIsSorted() === "desc" && <icons.ArrowUp class="size-4" />}
          {local.column.getIsSorted() === "asc" && <icons.ArrowDown class="size-4" />}
        </Button>
      </div>
    </Show>
  );
};

const columns: ColumnDef<Product>[] = [
  {
    id: "selects",
    header: (props) => (
      <Checkbox
        indeterminate={props.table.getIsSomePageRowsSelected()}
        checked={props.table.getIsAllPageRowsSelected()}
        onChange={(value) => props.table.toggleAllPageRowsSelected(value)}
        aria-label="Select all"
        class="translate-y-[2px]"
      >
        <CheckboxControl />
      </Checkbox>
    ),
    cell: (props) => (
      <Checkbox
        checked={props.row.getIsSelected()}
        onChange={(value) => props.row.toggleSelected(value)}
        aria-label="Select row"
        class="translate-y-[2px]"
      >
        <CheckboxControl />
      </Checkbox>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: (props) => <TableColumnHeader column={props.column} title="Code" />,
    cell: (props) => <div class="min-w-[120px]">{props.row.getValue("code")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand",
    header: (props) => <TableColumnHeader column={props.column} title="Brand" />,
    cell: (props) => <div>{props.row.getValue("brand")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: (props) => <TableColumnHeader column={props.column} title="Price" />,
    cell: (props) => <div>{props.row.getValue("price")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "title",
  //   header: (props) => <TableColumnHeader column={props.column} title="Title" />,
  //   cell: (props) => (
  //     <div class="flex space-x-2">
  //       <Badge variant="outline">{props.row.original.label}</Badge>
  //       <span class="max-w-[250px] truncate ">{props.row.getValue("title")}</span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "status",
  //   header: (props) => <TableColumnHeader column={props.column} title="Status" />,
  //   cell: (props) => {
  //     const statusColor = () =>
  //       ({
  //         todo: "bg-red-500",
  //         "in-progress": "bg-yellow-500",
  //         done: "bg-green-500",
  //         cancelled: "bg-gray-500",
  //       }[props.row.original.status] ?? "bg-gray-500");
  //     return (
  //       <div class="flex gap-2 px-2 items-center relative w-fit">
  //         <div class={"absolute inset-0 rounded-sm opacity-10 " + statusColor()} />
  //         <div class={"size-2 rounded-full " + statusColor()} />
  //         <span class="capitalize">{props.row.original.status}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return Array.isArray(value) && value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu placement="bottom-end">
        <DropdownMenuTrigger asChild>
          <As component={Button} variant="ghost" class="px-2">
            <icons.Ellipsis class="h-4" />
          </As>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const searchParamSchema = z.object({
  // page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(1000),
  sort: z.string().optional(),
});

const DataTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const { sort, page, per_page } = searchParamSchema.parse(searchParams);
  const { sort } = searchParamSchema.parse(searchParams);

  const sortingParams = sort?.split(",").map((v) => v.split(".")) ?? [];

  const [data] = createResource(async () => (await query).data);
  const [rowSelection, setRowSelection] = createSignal({});
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>({});
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([]);
  const [sorting, setSorting] = createSignal<SortingState>(
    sortingParams.map((v) => ({
      id: v[0],
      desc: v[1] === "desc",
    }))
  );

  const table = createSolidTable({
    get data() {
      return data() ?? [];
    },
    columns,
    state: {
      // get pagination() {
      //   return pagination();
      // },
      get pagination() {
        return { pageIndex: 0, pageSize: 1000 };
      },
      get sorting() {
        return sorting();
      },
      get columnVisibility() {
        return columnVisibility();
      },
      get rowSelection() {
        return rowSelection();
      },
      get columnFilters() {
        return columnFilters();
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  let searchFieldRef: HTMLInputElement | (() => void) | undefined;

  const print = createShortcut(["ctrl", "p"], () => {
    console.log("print");
  });
  const addProduct = createShortcut(["ctrl", "j"], () => {
    console.log("add product");
  });

  createShortcut(["ctrl", "l"], () => {
    if (typeof searchFieldRef === "function") return;
    searchFieldRef?.focus();
  });

  return (
    <div class="w-full h-0 grow space-y-2.5 flex flex-col">
      <div class="flex items-center justify-between gap-2">
        <TextField>
          <TextFieldInput
            ref={searchFieldRef}
            autofocus
            type="text"
            placeholder="Zoek een artikel..."
            class="bg-card w-80"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onInput={(e) => table.getColumn("title")?.setFilterValue(e.currentTarget.value)}
          />
        </TextField>
        <div class="flex items-center gap-2">
          <Select
            onChange={(e) => {
              table.getColumn("status")?.setFilterValue(e.length ? e.map((v) => v.value) : undefined);
            }}
            placement="bottom-end"
            sameWidth={false}
            options={filteredStatusList()}
            optionValue="value"
            optionTextValue="title"
            multiple
            itemComponent={(props) => (
              <SelectItem item={props.item} class="capitalize">
                {props.item.rawValue.title}
              </SelectItem>
            )}
          >
            <SelectTrigger asChild>
              <As
                component={Button}
                variant="outline"
                size="sm"
                class="relative flex w-full gap-2 [&>svg]:hidden bg-card"
              >
                <div class="flex items-center">
                  <icons.Filter class="h-4" />
                  <span>Status</span>
                </div>
                <SelectValue<ReturnType<typeof filteredStatusList>[0]> class="flex h-full items-center gap-1">
                  {(state) => (
                    <Show
                      when={state.selectedOptions().length <= 2}
                      fallback={
                        <>
                          <Badge class="absolute -top-2 right-0 block size-4 rounded-full p-0 capitalize md:hidden">
                            {state.selectedOptions().length}
                          </Badge>
                          <Badge variant="secondary" class="hidden capitalize md:inline-flex">
                            {state.selectedOptions().length} selected
                          </Badge>
                        </>
                      }
                    >
                      <For each={state.selectedOptions()}>
                        {(item) => (
                          <>
                            <Badge class="absolute -top-2 right-0 block size-4 rounded-full p-0 capitalize md:hidden">
                              {state.selectedOptions().length}
                            </Badge>
                            <Badge variant="secondary" class="hidden capitalize md:inline-flex">
                              {item.title}
                            </Badge>
                          </>
                        )}
                      </For>
                    </Show>
                  )}
                </SelectValue>
              </As>
            </SelectTrigger>
            <SelectContent />
          </Select>
          <DropdownMenu placement="bottom-end">
            <DropdownMenuTrigger asChild>
              <As component={Button} aria-label="Toggle columns" variant="outline" class="flex">
                <icons.Eye class="h-4" />
                {/* View */}
              </As>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-40">
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>Toggle columns</DropdownMenuGroupLabel>
                <DropdownMenuSeparator />
                <For
                  each={table
                    .getAllColumns()
                    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())}
                >
                  {(column) => (
                    <DropdownMenuCheckboxItem
                      class="capitalize"
                      checked={column.getIsVisible()}
                      onChange={(value) => column.toggleVisibility(value)}
                    >
                      <span class="truncate">{column.id}</span>
                    </DropdownMenuCheckboxItem>
                  )}
                </For>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger
              as={(props: TooltipTriggerProps) => (
                <Button {...props}>
                  <icons.CirclePlus class="h-4" />
                  Nieuw
                </Button>
              )}
            />
            <TooltipContent>
              {i18n.t({ en: "Add product", nl: "Artikel Toevoegen" })()}
              <ShortcutLabel for={addProduct} />
            </TooltipContent>
          </Tooltip>

          <DropdownMenu placement="bottom-start">
            <DropdownMenuTrigger
              as={(props) => (
                <Button variant="outline" class="px-2" {...props}>
                  <icons.EllipsisVertical class="h-4" />
                </Button>
              )}
            />
            <DropdownMenuContent class="w-56">
              <DropdownMenuItem>
                {i18n.action.print()}
                <ShortcutLabel for={print} />
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{i18n.action.export()}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>PDF</DropdownMenuItem>
                  <DropdownMenuItem>Excel</DropdownMenuItem>
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card class="h-full overflow-y-scroll relative">
        <Table>
          <TableHeader class="sticky top-0 z-10">
            {/* <div class="absolute inset-0 w-full bg-red-500"></div> */}

            <TableRow class="block absolute inset-0 bg-card border-b"> </TableRow>

            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow class="relative z-[5] border-none">
                  <For each={headerGroup.headers}>
                    {(header) => {
                      return (
                        <TableHead>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    }}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody class="h-10 overflow-hidden bg-card">
            <Show
              when={table.getRowModel().rows?.length}
              fallback={
                <TableRow>
                  <TableCell colSpan={columns.length} class="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => <TableCell>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DataTable;
