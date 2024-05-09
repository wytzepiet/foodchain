import { faker } from "@faker-js/faker";
import { As } from "@kobalte/core";
import { useSearchParams } from "@solidjs/router";
import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/solid-table";
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/solid-table";
import type { JSX, VoidProps } from "solid-js";
import { For, Match, Show, Switch, createSignal, splitProps } from "solid-js";
import { z } from "zod";
import { Badge } from "~/lib/components/ui/badge";
import { Button } from "~/lib/components/ui/button";
import { Checkbox, CheckboxControl } from "~/lib/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/lib/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { TextField, TextFieldInput } from "~/lib/components/ui/textfield";
import { icons } from "lucide-solid";

type Task = {
  id: string;
  code: string;
  title: string;
  status: "todo" | "in-progress" | "done" | "cancelled";
  label: "bug" | "feature" | "enhancement" | "documentation";
};
import { i18n } from "~/main/i18n";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/lib/components/ui/dropdown-menu";
import { Card } from "./ui/card";
import ShortcutLabel from "./shortcutLabel";
import addShortcut from "../utilities/shortcut";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/lib/components/ui/tooltip";
import type { TooltipTriggerProps } from "@kobalte/core/dist/types/tooltip";

const makeData = (len: number) =>
  Array.from({ length: len }, (_, i) => i).map(
    (): Task => ({
      id: faker.string.nanoid(),
      code: `TASK-${faker.string.numeric({ length: 2 })}`,
      title: faker.hacker
        .phrase()
        .replace(/^./, (letter) => letter.toUpperCase()),
      status:
        faker.helpers.shuffle<Task["status"]>([
          "todo",
          "in-progress",
          "done",
          "cancelled",
        ])[0] ?? "todo",
      label:
        faker.helpers.shuffle<Task["label"]>([
          "bug",
          "feature",
          "enhancement",
          "documentation",
        ])[0] ?? "bug",
    })
  );

const filteredStatusList = () =>
  ["todo", "in-progress", "done", "cancelled"].map((e) => ({
    title: e,
    value: e,
  }));

const TableColumnHeader = <TData, TValue>(
  props: VoidProps<{ column: Column<TData, TValue>; title: string }>
) => {
  const [local] = splitProps(props, ["column", "title"]);

  return (
    <Show
      when={local.column.getCanSort() && local.column.getCanHide()}
      fallback={<span class="text-sm font-medium">{local.title}</span>}
    >
      <div class="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <As
              component={Button}
              aria-label={
                local.column.getIsSorted() === "desc"
                  ? "Sorted descending. Click to sort ascending."
                  : local.column.getIsSorted() === "asc"
                  ? "Sorted ascending. Click to sort descending."
                  : "Not sorted. Click to sort ascending."
              }
              variant="ghost"
              class="-ml-4 h-8 data-[expanded]:bg-accent"
            >
              <span>{local.title}</span>
              <div class="ml-1">
                <Switch
                  fallback={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-3.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m8 9l4-4l4 4m0 6l-4 4l-4-4"
                      />
                    </svg>
                  }
                >
                  <Match when={local.column.getIsSorted() === "asc"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-3.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v14m4-10l-4-4M8 9l4-4"
                      />
                    </svg>
                  </Match>
                  <Match when={local.column.getIsSorted() === "desc"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-3.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v14m4-4l-4 4m-4-4l4 4"
                      />
                    </svg>
                  </Match>
                </Switch>
              </div>
            </As>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Show when={local.column.getCanSort()}>
              <DropdownMenuItem
                aria-label="Sort ascending"
                onClick={() => local.column.toggleSorting(false, true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 size-4 text-muted-foreground/70"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v14m4-10l-4-4M8 9l4-4"
                  />
                </svg>
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-label="Sort descending"
                onClick={() => local.column.toggleSorting(true, true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 size-4 text-muted-foreground/70"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v14m4-4l-4 4m-4-4l4 4"
                  />
                </svg>
                Desc
              </DropdownMenuItem>
            </Show>

            <Show when={local.column.getCanSort() && local.column.getCanHide()}>
              <DropdownMenuSeparator />
            </Show>

            <Show when={local.column.getCanHide()}>
              <DropdownMenuItem
                aria-label="Hide column"
                onClick={() => local.column.toggleVisibility(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 size-4 text-muted-foreground/70"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 9c-2.4 2.667-5.4 4-9 4c-3.6 0-6.6-1.333-9-4m0 6l2.5-3.8M21 14.976L18.508 11.2M9 17l.5-4m5.5 4l-.5-4"
                  />
                </svg>
                Hide
              </DropdownMenuItem>
            </Show>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Show>
  );
};

const columns: ColumnDef<Task>[] = [
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
    header: (props) => <TableColumnHeader column={props.column} title="Task" />,
    cell: (props) => (
      <div class="w-[70px]">
        <Button variant="ghost" class="h-8 whitespace-nowrap">
          {props.row.getValue("code")}
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: (props) => (
      <TableColumnHeader column={props.column} title="Title" />
    ),
    cell: (props) => (
      <div class="flex space-x-2">
        <Badge variant="outline">{props.row.original.label}</Badge>
        <span class="max-w-[250px] truncate ">
          {props.row.getValue("title")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: (props) => (
      <TableColumnHeader column={props.column} title="Status" />
    ),
    cell: (props) => (
      <div class="flex w-32 items-center">
        <Switch>
          <Match when={props.row.original.status === "cancelled"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20.777a8.942 8.942 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223M14 14l-4-4m0 4l4-4"
              />
            </svg>
          </Match>
          <Match when={props.row.original.status === "done"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M10 20.777a8.942 8.942 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223" />
                <path d="m9 12l2 2l4-4" />
              </g>
            </svg>
          </Match>
          <Match when={props.row.original.status === "in-progress"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20.777a8.942 8.942 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223M12 9l-2 3h4l-2 3"
              />
            </svg>
          </Match>
          <Match when={props.row.original.status === "todo"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M12 16v.01M12 13a2 2 0 0 0 .914-3.782a1.98 1.98 0 0 0-2.414.483M10 20.777a8.942 8.942 0 0 1-2.48-.969" />
                <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223" />
              </g>
            </svg>
          </Match>
        </Switch>
        <span class="capitalize">{props.row.original.status}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return Array.isArray(value) && value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu placement="bottom-end">
        <DropdownMenuTrigger class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
            />
          </svg>
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

const DataTableDemo = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const { sort, page, per_page } = searchParamSchema.parse(searchParams);
  const { sort } = searchParamSchema.parse(searchParams);

  const sortingParams = sort?.split(",").map((v) => v.split(".")) ?? [];

  const [data] = createSignal(makeData(100));
  const [rowSelection, setRowSelection] = createSignal({});
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>(
    {}
  );
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = createSignal<SortingState>(
    sortingParams.map((v) => ({
      id: v[0],
      desc: v[1] === "desc",
    }))
  );
  // const [pagination, setPagination] = createSignal<PaginationState>({
  //   pageIndex: page - 1,
  //   pageSize: per_page,
  // });

  // onMount(() => {
  //   setSearchParams({
  //     page: searchParams.page !== undefined ? searchParams.page : 1,
  //     per_page:
  //       searchParams.per_page !== undefined ? searchParams.per_page : 10,
  //   });
  // });

  // createEffect(
  //   on(
  //     [pagination, sorting],
  //     ([p, s]) => {
  //       setSearchParams({
  //         page: p.pageIndex + 1,
  //         per_page: p.pageSize,
  //         sort: s
  //           .map((v) => (v.id ? `${v.id}.${v.desc ? "desc" : "asc"}` : null))
  //           .join(","),
  //       });
  //     },
  //     {
  //       defer: true,
  //     }
  //   )
  // );

  const table = createSolidTable({
    get data() {
      return data();
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

  const print = addShortcut(["ctrl", "p"], () => {
    console.log("print");
  });
  const addProduct = addShortcut(["ctrl", "n"], () => {});

  addShortcut(["/"], () => {
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
            onInput={(e) =>
              table.getColumn("title")?.setFilterValue(e.currentTarget.value)
            }
          />
        </TextField>
        <div class="flex items-center gap-2">
          <Select
            onChange={(e) => {
              table
                .getColumn("status")
                ?.setFilterValue(e.length ? e.map((v) => v.value) : undefined);
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
                <SelectValue<
                  ReturnType<typeof filteredStatusList>[0]
                > class="flex h-full items-center gap-1">
                  {(state) => (
                    <Show
                      when={state.selectedOptions().length <= 2}
                      fallback={
                        <>
                          <Badge class="absolute -top-2 right-0 block size-4 rounded-full p-0 capitalize md:hidden">
                            {state.selectedOptions().length}
                          </Badge>
                          <Badge
                            variant="secondary"
                            class="hidden capitalize md:inline-flex"
                          >
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
                            <Badge
                              variant="secondary"
                              class="hidden capitalize md:inline-flex"
                            >
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
              <As
                component={Button}
                aria-label="Toggle columns"
                variant="outline"
                class="flex"
              >
                <icons.Eye class="h-4" />
                View
              </As>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-40">
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>Toggle columns</DropdownMenuGroupLabel>
                <DropdownMenuSeparator />
                <For
                  each={table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== "undefined" &&
                        column.getCanHide()
                    )}
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
                <Button shortcut={addProduct} {...props}>
                  <icons.CirclePlus class="h-4" />
                  {i18n.t({ en: "Add product", nl: "Artikel Toevoegen" })()}
                </Button>
              )}
            />
            <TooltipContent>
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
                <DropdownMenuShortcut>
                  <ShortcutLabel for={print} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {i18n.action.export()}
                </DropdownMenuSubTrigger>
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
          <TableHeader class="sticky top-0 z-10 bg-card">
            {/* <div class="absolute inset-0 w-full bg-red-500"></div> */}
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow class="relative z-[5]">
                  <For each={headerGroup.headers}>
                    {(header) => {
                      return (
                        <TableHead>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
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
                      {(cell) => (
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )}
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

export default DataTableDemo;
