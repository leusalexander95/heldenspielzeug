"use client";

import Link from "next/link";
import { products, categories, getCategory } from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import HeroCarousel from "@/components/HeroCarousel";
import ShopByAge from "@/components/ShopByAge";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  const { t, locale } = useLang();
  const featured = products.filter((p) => p.featured);
  const popular = [...featured, ...products.filter((p) => !p.featured)].slice(0, 8);

  // three category showcases with 4 products each
  const showcaseKeys = ["puppenhaus", "lernen", "musik"] as const;
  const showcases = showcaseKeys.map((key) => ({
    cat: getCategory(key),
    items: products.filter((p) => p.category === key).slice(0, 4),
  }));

  const reviews =
    locale === "de"
      ? [
          { n: "Anna & Leo", txt: "Wunderschöne Qualität und wirklich nachhaltig. Unser Sohn liebt das Puppenhaus!" },
          { n: "Familie Weber", txt: "Das Bavvic Bauset ist der Hit – stundenlang wird gebaut. Klare Empfehlung." },
          { n: "Sophie M.", txt: "Endlich Spielzeug, das lange hält und schön aussieht. Wir bestellen wieder." },
        ]
      : [
          { n: "Anna & Leo", txt: "Beautiful quality and truly sustainable. Our son loves the dollhouse!" },
          { n: "The Weber family", txt: "The Bavvic building set is a hit – hours of building. Highly recommended." },
          { n: "Sophie M.", txt: "Finally toys that last and look lovely. We'll order again." },
        ];

  const ages = ["6M+", "12M+", "18M+", "2+", "3+", "5+"];

  return (
    <>
      <h1 className="sr-only">{t.hero.title}</h1>

      {/* Rotating hero banner */}
      <HeroCarousel />

      {/* Shop by age / category search */}
      <ShopByAge />

      {/* Trust / guarantees */}
      <TrustBar />

      {/* Category grid */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold text-forest">{t.sections.collections}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => {
            const rep = products.find((p) => p.category === c.key);
            return (
              <Link
                key={c.key}
                href={`/products?cat=${c.key}`}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {rep && (
                  <ProductImage product={rep} className="absolute inset-0 h-full w-full transition group-hover:scale-105" rounded="rounded-3xl" />
                )}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="relative flex items-center gap-2 p-4">
                  <span className="text-xl drop-shadow">{c.icon}</span>
                  <span className="font-display text-sm font-bold text-white drop-shadow">{locale === "de" ? c.de : c.en}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular products */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-forest">{t.sections.new}</h2>
            <p className="mt-2 text-brown/70">{t.sections.newSub}</p>
          </div>
          <Link href="/products" className="hidden shrink-0 rounded-full border-2 border-mint-dark px-5 py-2.5 text-sm font-bold text-mint-dark transition hover:bg-mint-dark hover:text-white sm:block">
            {t.sections.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Category showcases */}
      {showcases.map(({ cat, items }) => (
        <section key={cat.key} className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-extrabold text-forest">
              <span className="mr-2">{cat.icon}</span>
              {locale === "de" ? cat.de : cat.en}
            </h2>
            <Link href={`/products?cat=${cat.key}`} className="text-sm font-bold text-mint-dark hover:underline">
              {t.sections.viewAll} →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ))}

      {/* By age */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold text-forest">{t.sections.byAge}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {ages.map((a, i) => (
            <Link
              key={a}
              href="/products"
              className="flex h-24 w-24 flex-col items-center justify-center rounded-full text-white transition hover:scale-105"
              style={{ background: ["var(--mint-dark)", "var(--blue)", "var(--yellow)", "var(--orange)", "var(--brown)", "var(--forest)"][i] }}
            >
              <span className="font-display text-xl font-extrabold">{a}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center font-display text-3xl font-extrabold text-forest">{t.sections.why}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {t.why.map((w, i) => (
              <div key={i} className="rounded-3xl bg-white/70 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: ["var(--mint)", "var(--yellow)", "var(--blue)"][i] }}>
                  {["🛡️", "✨", "🌱"][i]}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brown">{w.t}</h3>
                <p className="mt-2 text-sm text-brown/70">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center font-display text-3xl font-extrabold text-forest">{t.sections.reviews}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-3xl bg-white/70 p-7">
              <div className="text-yellow">★★★★★</div>
              <p className="mt-3 text-brown/80">“{r.txt}”</p>
              <p className="mt-4 font-display font-bold text-brown">{r.n}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
