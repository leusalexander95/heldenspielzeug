import { generatedProducts } from "./generated";
import type { CatalogProduct, CategoryKey, Locale } from "./types";

export type { Locale, CategoryKey } from "./types";
export type Product = CatalogProduct;

export interface CategoryInfo {
  key: CategoryKey;
  de: string;
  en: string;
  icon: string;
  color: string;
}

export const categories: CategoryInfo[] = [
  { key: "rollenspiel", de: "Rollenspiel", en: "Pretend Play", icon: "🍳", color: "var(--orange)" },
  { key: "puppenhaus", de: "Puppenhaus", en: "Dollhouse", icon: "🏠", color: "var(--forest)" },
  { key: "lernen", de: "Lernen & Entdecken", en: "Learning & Education", icon: "🔢", color: "var(--blue)" },
  { key: "bauen", de: "Bauen & Konstruktion", en: "Blocks & Construction", icon: "🧰", color: "var(--brown)" },
  { key: "bau", de: "Bau-Sets", en: "Building Sets", icon: "🧱", color: "var(--blue)" },
  { key: "musik", de: "Musik", en: "Music", icon: "🥁", color: "var(--yellow)" },
  { key: "bewegung", de: "Bewegung & Aktiv", en: "Active Play", icon: "⚽", color: "var(--mint-dark)" },
  { key: "wasser", de: "Wasserspiel", en: "Water Play", icon: "🚤", color: "var(--blue)" },
  { key: "fahren", de: "Fahren & Nachziehen", en: "Push & Pull", icon: "🚗", color: "var(--orange)" },
  { key: "baby", de: "Baby", en: "Baby", icon: "🍼", color: "var(--mint)" },
];

// Bavvic sets from the customer invoice RE-2026-1255 (wooden blocks + silicone connectors).
const bavvic: CatalogProduct[] = [
  { slug: "bavvic-team-set", name: "Bavvic Team Set", price: 359, category: "bau", brand: "Bavvic", featured: true },
  { slug: "bavvic-dreame-set", name: "Bavvic Dreame Set", price: 119, category: "bau", brand: "Bavvic", featured: true },
  { slug: "bavvic-connectors-set", name: "Bavvic Connectors Set", price: 28, category: "bau", brand: "Bavvic", featured: true },
];

// PlanToys items from the invoice that are not in the fetched catalog page — added with exact invoice prices.
const invoiceExtras: CatalogProduct[] = [
  { slug: "victorian-dollhouse", name: "PlanToys Viktorianisches Puppenhaus", price: 299, category: "puppenhaus", brand: "PlanToys", featured: true },
  { slug: "palomino-modern-rustic", name: "PlanToys Schaukelpferd Modern Rustic", price: 90, category: "fahren", brand: "PlanToys", featured: true },
  { slug: "road-system", name: "PlanToys Spielzeug Straße aus Holz", price: 89, category: "fahren", brand: "PlanToys", featured: true },
];

// Deduplicate: invoiceExtras/bavvic take priority over any generated entry with the same slug.
const overrideSlugs = new Set([...bavvic, ...invoiceExtras].map((p) => p.slug));
export const products: CatalogProduct[] = [
  ...bavvic,
  ...invoiceExtras,
  ...generatedProducts.filter((p) => !overrideSlugs.has(p.slug)),
];

const categoryMap = new Map(categories.map((c) => [c.key, c]));
const productMap = new Map(products.map((p) => [p.slug, p]));

export function getCategory(key: CategoryKey): CategoryInfo {
  return categoryMap.get(key) ?? categories[0];
}

export function getProduct(slug: string): CatalogProduct | undefined {
  return productMap.get(slug);
}

export function productImage(slug: string): string {
  return `/products/${slug}.jpg`;
}

export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function ageText(p: CatalogProduct, locale: Locale): string {
  if (p.category === "baby") return locale === "de" ? "ab 6 Monaten" : "6 months+";
  return locale === "de" ? "ab 3 Jahren" : "3 years+";
}

export function shortText(p: CatalogProduct, locale: Locale): string {
  const c = getCategory(p.category);
  const label = locale === "de" ? c.de : c.en;
  return `${p.brand} · ${label}`;
}

export function descText(p: CatalogProduct, locale: Locale): string {
  const c = getCategory(p.category);
  if (p.brand === "Bavvic") {
    return locale === "de"
      ? `${p.name}: modulares Holz-Bausystem mit flexiblen Silikon-Verbindern. Offenes, Montessori-inspiriertes Spielen fördert Kreativität, Konzentration und räumliches Denken – ruhig, sensorisch und langlebig.`
      : `${p.name}: a modular wooden building system with flexible silicone connectors. Open-ended, Montessori-inspired play encourages creativity, focus and spatial thinking – calm, sensory and durable.`;
  }
  const catDe = c.de.toLowerCase();
  const catEn = c.en.toLowerCase();
  return locale === "de"
    ? `${p.name} von ${p.brand}: nachhaltiges Spielzeug aus der Kategorie ${catDe}. Aus umweltfreundlichem Holz, schadstofffrei und mit wasserbasierten Farben gefertigt – fördert Fantasie, Motorik und Entwicklung, sicher und langlebig.`
    : `${p.name} by ${p.brand}: sustainable ${catEn} toy. Made from eco-friendly wood, non-toxic and finished with water-based paints – nurtures imagination, motor skills and development, safe and built to last.`;
}

export function featuresList(p: CatalogProduct, locale: Locale): string[] {
  if (p.brand === "Bavvic") {
    return locale === "de"
      ? ["Natürliches Holz & Silikon-Verbinder", "Frei von Schadstoffen", "Montessori-inspiriert", "Offenes Spielen"]
      : ["Natural wood & silicone connectors", "Free from harmful substances", "Montessori-inspired", "Open-ended play"];
  }
  return locale === "de"
    ? ["Nachhaltiges Holz", "Schadstofffrei & sicher", "Wasserbasierte Farben", "Fördert die Entwicklung"]
    : ["Sustainable wood", "Non-toxic & safe", "Water-based paints", "Supports development"];
}
