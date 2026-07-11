import type { MetadataRoute } from "next";

const BASE_URL = "https://heldenspielzeug-shop.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
