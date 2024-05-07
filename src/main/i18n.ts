import { createMemo, createSignal } from "solid-js";

export const i18n = {
  actions: {
    print: t({ en: "Print", nl: "Printen" }),
  },
  prod: {
    ean: t({ en: "EAN", nl: "EAN" }),
    product: t({ en: "Product", nl: "Artikel" }),
    products: t({ en: "Products", nl: "Artikelen" }),
  },
  stock: {
    management: t({ en: "Stock management", nl: "Voorraadbeheer" }),
    location: t({ en: "Stock location", nl: "Voorraadlocatie" }),
    locations: t({ en: "Stock locations", nl: "Voorraadlocaties" }),
  },
  cust: {
    customer: t({ en: "Customer", nl: "Klant" }),
    customers: t({ en: "Customers", nl: "Klanten" }),
  },
  sup: {
    supplier: t({ en: "Supplier", nl: "Leverancier" }),
    suppliers: t({ en: "Suppliers", nl: "Leveranciers" }),
  },
  pur: {
    purchase: t({ en: "Purchase", nl: "Inkoop" }),
    purchases: t({ en: "Purchases", nl: "Inkopen" }),
  },
  sale: {
    sale: t({ en: "Sale", nl: "Verkoop" }),
    sales: t({ en: "Sales", nl: "Verkopen" }),
  },
  fin: {
    financial: t({ en: "Financial", nl: "Financieel" }),
  },
  del: {
    delivery: t({ en: "Delivery", nl: "Levering" }),
    deliveries: t({ en: "Deliveries", nl: "Leveringen" }),
  },
  t: t,
};

// export let i18n = translations();

type Translation = { en: string; nl: string };
type Language = "nl" | "en";
const [language, setLanguage] = createSignal<Language>("nl");

function t({ en, nl }: Translation) {
  return () => (language() === "nl" ? nl : en);
}
