import type { Metadata } from "next";
import { products, getProduct, getCategory } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produkt nicht gefunden" };

  const cat = getCategory(product.category);
  const description = `${product.name} von ${product.brand} – nachhaltiges Holzspielzeug (${cat.de}) bei Heldenspielzeug. Fair, sicher und langlebig.`;
  const image = `/products/${slug}.jpg`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: product.name,
      description,
      type: "website",
      images: [{ url: image }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  const jsonLd = product
    ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.name,
        brand: { "@type": "Brand", name: product.brand },
        image: `https://heldenspielzeug.de/products/${slug}.jpg`,
        category: getCategory(product.category).de,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: product.price,
          availability: "https://schema.org/InStock",
          url: `https://heldenspielzeug.de/products/${slug}`,
          seller: { "@type": "Organization", name: "Heldenspielzeug GmbH" },
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <ProductDetailClient slug={slug} />
    </>
  );
}
