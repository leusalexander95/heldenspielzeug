"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

const ages = [
  { value: "0-6m", label: "0–6M" },
  { value: "6m", label: "6M+" },
  { value: "12m", label: "12M+" },
  { value: "18m", label: "18M+" },
  { value: "2y", label: "2 Yrs+" },
  { value: "3y", label: "3 Yrs+" },
];

const prices = [
  { value: "u30", de: "Bis 30 €", en: "Under €30" },
  { value: "30-60", de: "30–60 €", en: "€30–60" },
  { value: "60-100", de: "60–100 €", en: "€60–100" },
  { value: "o100", de: "Über 100 €", en: "Over €100" },
];

export default function Header() {
  const { t, locale, setLocale } = useLang();
  const de = locale === "de";
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  const collections = [
    { href: "/products?collection=bestseller", label: de ? "Bestseller" : "Best Sellers" },
    { href: "/products?cat=puppenhaus", label: de ? "Puppenhäuser" : "Dollhouses" },
    { href: "/products?cat=bau", label: de ? "Bau-Sets" : "Building Sets" },
    { href: "/products?cat=rollenspiel", label: de ? "Rollenspiel" : "Pretend Play" },
    { href: "/products?cat=lernen", label: de ? "Lernen & Entdecken" : "Learning & Education" },
  ];

  const aboutLinks = [
    { href: "/about", label: de ? "Über uns" : "About Us" },
    { href: "/kontakt", label: de ? "Kontakt" : "Contact" },
    { href: "/faq", label: de ? "FAQ" : "FAQ" },
    { href: "/versand", label: de ? "Versand & Zahlung" : "Shipping & Payment" },
    { href: "/impressum", label: de ? "Impressum" : "Imprint" },
  ];

  const navBtn = "text-sm font-semibold text-brown transition hover:text-mint-dark";
  const dropWrap =
    "absolute left-1/2 top-full z-50 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-xl shadow-brown/10";
  const dropItem =
    "block rounded-xl px-3 py-2 text-sm font-semibold text-brown transition hover:bg-cream";

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur">
      <div className="bg-mint-dark text-center text-xs font-medium text-white py-2 px-4">{t.announce}</div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Heldenspielzeug" className="shrink-0">
          <Image src="/logo.png" alt="Heldenspielzeug" width={1024} height={384} priority className="h-12 w-auto sm:h-14 lg:h-16" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/products?sort=featured" className={navBtn}>
            {de ? "Neu" : "New"}
          </Link>

          {/* Categories */}
          <div className="relative" onMouseEnter={() => setMenu("cat")} onMouseLeave={() => setMenu(null)}>
            <button className={navBtn}>{de ? "Kategorien" : "Shop By Categories"} ▾</button>
            {menu === "cat" && (
              <div className={`${dropWrap} grid w-[26rem] grid-cols-2 gap-1`}>
                {categories.map((c) => (
                  <Link key={c.key} href={`/products?cat=${c.key}`} className={`${dropItem} flex items-center gap-2`}>
                    <span className="text-lg">{c.icon}</span>
                    {de ? c.de : c.en}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Shop by Age */}
          <div className="relative" onMouseEnter={() => setMenu("age")} onMouseLeave={() => setMenu(null)}>
            <button className={navBtn}>{de ? "Nach Alter" : "Shop by Age"} ▾</button>
            {menu === "age" && (
              <div className={`${dropWrap} w-40`}>
                {ages.map((a) => (
                  <Link key={a.value} href={`/products?age=${a.value}`} className={dropItem}>
                    {a.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Shop by Price */}
          <div className="relative" onMouseEnter={() => setMenu("price")} onMouseLeave={() => setMenu(null)}>
            <button className={navBtn}>{de ? "Nach Preis" : "Shop by Price"} ▾</button>
            {menu === "price" && (
              <div className={`${dropWrap} w-44`}>
                {prices.map((p) => (
                  <Link key={p.value} href={`/products?price=${p.value}`} className={dropItem}>
                    {de ? p.de : p.en}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Collections */}
          <div className="relative" onMouseEnter={() => setMenu("coll")} onMouseLeave={() => setMenu(null)}>
            <button className={navBtn}>{de ? "Kollektionen" : "Collections"} ▾</button>
            {menu === "coll" && (
              <div className={`${dropWrap} w-56`}>
                {collections.map((c) => (
                  <Link key={c.href} href={c.href} className={dropItem}>
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <div className="relative" onMouseEnter={() => setMenu("about")} onMouseLeave={() => setMenu(null)}>
            <button className={navBtn}>{de ? "Über uns" : "About Us"} ▾</button>
            {menu === "about" && (
              <div className={`${dropWrap} w-52`}>
                {aboutLinks.map((a) => (
                  <Link key={a.href} href={a.href} className={dropItem}>
                    {a.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-full border border-mint text-xs font-bold">
            {(["de", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2.5 py-1 uppercase transition ${
                  locale === l ? "bg-mint-dark text-white" : "text-brown hover:bg-mint/30"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link href="/cart" className="relative flex items-center gap-1 rounded-full bg-white/70 px-3 py-2 text-brown transition hover:bg-white">
            <span aria-hidden>🛒</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          <button className="md:hidden text-2xl text-brown" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[75vh] overflow-y-auto border-t border-cream-dark bg-cream px-4 py-3 md:hidden">
          <Link href="/products" onClick={() => setOpen(false)} className="block py-2 text-sm font-bold text-brown">
            {t.nav.shop}
          </Link>

          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-mint-dark">{de ? "Kategorien" : "Categories"}</p>
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/products?cat=${c.key}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-semibold text-brown"
            >
              <span>{c.icon}</span>
              {de ? c.de : c.en}
            </Link>
          ))}

          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-mint-dark">{de ? "Nach Alter" : "Shop by Age"}</p>
          <div className="flex flex-wrap gap-2 py-1">
            {ages.map((a) => (
              <Link
                key={a.value}
                href={`/products?age=${a.value}`}
                onClick={() => setOpen(false)}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brown"
              >
                {a.label}
              </Link>
            ))}
          </div>

          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-mint-dark">{de ? "Nach Preis" : "Shop by Price"}</p>
          <div className="flex flex-wrap gap-2 py-1">
            {prices.map((p) => (
              <Link
                key={p.value}
                href={`/products?price=${p.value}`}
                onClick={() => setOpen(false)}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brown"
              >
                {de ? p.de : p.en}
              </Link>
            ))}
          </div>

          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-mint-dark">{de ? "Kollektionen" : "Collections"}</p>
          {collections.map((c) => (
            <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-brown">
              {c.label}
            </Link>
          ))}

          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-mint-dark">{de ? "Über uns" : "About Us"}</p>
          {aboutLinks.map((a) => (
            <Link key={a.href} href={a.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-brown">
              {a.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
