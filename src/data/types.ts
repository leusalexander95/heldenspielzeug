export type Locale = "de" | "en";

export type CategoryKey =
  | "rollenspiel"
  | "bauen"
  | "lernen"
  | "musik"
  | "bewegung"
  | "wasser"
  | "baby"
  | "fahren"
  | "puppenhaus"
  | "bau";

export interface CatalogProduct {
  slug: string;
  name: string;
  price: number;
  category: CategoryKey;
  brand: string;
  featured?: boolean;
}
