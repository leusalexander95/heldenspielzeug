"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  getProduct,
  getCategory,
  products,
  formatPrice,
  shortText,
  descText,
  featuresList,
  ageText,
} from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { t, locale } = useLang();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const product = getProduct(slug);
  if (!product) return notFound();

  const cat = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const features = featuresList(product, locale);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 text-sm text-brown/60">
        <Link href="/" className="hover:text-mint-dark">Home</Link> ·{" "}
        <Link href="/products" className="hover:text-mint-dark">{t.nav.shop}</Link> ·{" "}
        <Link href={`/products?cat=${product.category}`} className="hover:text-mint-dark">
          {locale === "de" ? cat.de : cat.en}
        </Link> ·{" "}
        <span className="text-brown">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductImage product={product} className="aspect-square w-full" rounded="rounded-3xl" />

        <div>
          <span className="inline-block rounded-full bg-mint/40 px-3 py-1 text-xs font-bold text-forest">
            {locale === "de" ? cat.de : cat.en}
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-forest">{product.name}</h1>
          <p className="mt-2 text-brown/70">{shortText(product, locale)}</p>
          <div className="mt-5 font-display text-3xl font-extrabold text-forest">{formatPrice(product.price, locale)}</div>
          <p className="mt-6 leading-relaxed text-brown/80">{descText(product, locale)}</p>

          <div className="mt-6 flex gap-6 text-sm">
            <div>
              <span className="block font-bold text-brown/50">{t.product.age}</span>
              <span className="text-brown">{ageText(product, locale)}</span>
            </div>
            <div>
              <span className="block font-bold text-brown/50">{t.product.category}</span>
              <span className="text-brown">{locale === "de" ? cat.de : cat.en}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => {
                add(product.slug);
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="rounded-full bg-mint-dark px-8 py-3.5 font-bold text-white transition hover:bg-forest"
            >
              {added ? "✓" : t.product.add}
            </button>
            <Link href="/cart" className="rounded-full border-2 border-brown/20 px-8 py-3.5 font-bold text-brown transition hover:border-mint-dark hover:text-mint-dark">
              {t.product.buy}
            </Link>
          </div>

          <div className="mt-10 rounded-3xl bg-white/60 p-6">
            <h3 className="font-display text-lg font-bold text-brown">{t.product.features}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-brown/80">
                  <span className="text-mint-dark">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-extrabold text-forest">{t.product.related}</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
