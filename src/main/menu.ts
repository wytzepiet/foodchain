import { i18n } from "./i18n";
import { LucideProps, icons } from "lucide-solid";
import { JSX } from "solid-js";

const menu: MenuItem[] = [
  {
    title: () => "Dashboard",
    href: "/",
    icon: icons.LayoutDashboard,
  },
  {
    title: i18n.prod.products,
    href: "/",
    icon: icons.Carrot,
    items: [
      { title: i18n.prod.ean, href: "#" },
      { title: i18n.stock.location, href: "#" },
      { title: () => "Categorieën", href: "#" },
    ],
  },
  {
    title: i18n.stock.management,
    href: "#",
    icon: icons.Box,
  },
  {
    title: i18n.cust.customers,
    href: "#",
    icon: icons.Users,
    items: [{ title: i18n.cust.customers, href: "#" }],
  },
  {
    title: i18n.sup.suppliers,
    href: "#",
    icon: icons.Factory,
    items: [{ title: i18n.sup.suppliers, href: "#" }],
  },
  {
    title: i18n.pur.purchases,
    href: "#",
    icon: icons.Download,
    items: [{ title: i18n.pur.purchases, href: "#" }],
  },
  {
    title: i18n.sale.sales,
    href: "#",
    icon: icons.ShoppingCart,
    items: [{ title: i18n.sale.sales, href: "#" }],
  },
  {
    title: i18n.fin.financial,
    href: "#",
    icon: icons.Euro,
    items: [],
  },
  {
    title: i18n.del.deliveries,
    href: "#",
    icon: icons.Truck,
    items: [{ title: i18n.del.deliveries, href: "#" }],
  },
];

export default menu;

type MenuItem = {
  title: () => string;
  href: string;
  icon: (props: LucideProps) => JSX.Element;
  items?: {
    title: () => string;
    href: string;
  }[];
};
