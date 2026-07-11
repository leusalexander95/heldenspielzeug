"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";
import { getProduct } from "@/data/products";
import ProductImage from "./ProductImage";

interface Slide {
  slug: string;
  badge: { de: string; en: string };
  title: { de: string; en: string };
  text: { de: string; en: string };
  cta: { de: string; en: string };
  href: string;
  bg: string;
}

const slides: Slide[] = [
  {
    slug: "bavvic-team-set",
    badge: { de: "Nachhaltig · Fair", en: "Sustainable · Fair" },
    title: { de: "Spielzeug, das mitwächst", en: "Toys that grow with you" },
    text: {
      de: "Von Bäumen zu Spielzeug – Holz- und Bau-Sets, die Fantasie und Entwicklung fördern.",
      en: "From trees to toys – wooden and building sets that nurture imagination and development.",
    },
    cta: { de: "Jetzt entdecken", en: "Shop now" },
    href: "/products",
    bg: "linear-gradient(120deg, #e7f2ea 0%, #cfe6d5 100%)",
  },
  {
    slug: "victorian-dollhouse",
    badge: { de: "Puppenhaus-Kollektion", en: "Dollhouse Collection" },
    title: { de: "Träume aus Holz", en: "Dreams made of wood" },
    text: {
      de: "Liebevoll gestaltete Puppenhäuser aus nachhaltigem Holz – für fantasievolles Rollenspiel.",
      en: "Lovingly designed wooden dollhouses – for imaginative role-play.",
    },
    cta: { de: "Puppenhäuser ansehen", en: "Shop dollhouses" },
    href: "/products?cat=puppenhaus",
    bg: "linear-gradient(120deg, #fdeede 0%, #f6d9be 100%)",
  },
  {
    slug: "bavvic-dreame-set",
    badge: { de: "Montessori-inspiriert", en: "Montessori-inspired" },
    title: { de: "Bauen ohne Grenzen", en: "Build without limits" },
    text: {
      de: "Bavvic Bau-Sets aus Holz mit Silikon-Verbindern – ruhiges, kreatives Spielen.",
      en: "Bavvic wooden building sets with silicone connectors – calm, creative play.",
    },
    cta: { de: "Bau-Sets entdecken", en: "Shop building sets" },
    href: "/products?cat=bau",
    bg: "linear-gradient(120deg, #e3edf6 0%, #c7dcee 100%)",
  },
];

export default function HeroCarousel() {
  const { locale } = useLang();
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl">
        {/* Slides */}
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s) => {
            const product = getProduct(s.slug);
            return (
              <div key={s.slug} className="grid min-w-full items-center gap-6 p-8 sm:grid-cols-2 sm:p-12" style={{ background: s.bg }}>
                <div>
                  <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-forest">
                    {locale === "de" ? s.badge.de : s.badge.en}
                  </span>
                  <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-forest sm:text-5xl">
                    {locale === "de" ? s.title.de : s.title.en}
                  </h2>
                  <p className="mt-4 max-w-md text-brown/80">{locale === "de" ? s.text.de : s.text.en}</p>
                  <Link
                    href={s.href}
                    className="mt-6 inline-block rounded-full bg-mint-dark px-7 py-3.5 font-bold text-white shadow-lg shadow-mint/40 transition hover:bg-forest"
                  >
                    {locale === "de" ? s.cta.de : s.cta.en}
                  </Link>
                </div>
                <div className="flex justify-center">
                  {product && <ProductImage product={product} className="aspect-square w-full max-w-sm shadow-xl" rounded="rounded-2xl" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brown shadow transition hover:bg-white"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brown shadow transition hover:bg-white"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-mint-dark" : "w-2.5 bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
