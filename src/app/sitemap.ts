import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE_URL = "https://heldenspielzeug-shop.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/products",
    "/about",
    "/kontakt",
    "/faq",
    "/versand",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/widerruf",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries];
}
