"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, type CategoryKey } from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";

const PER_PAGE = 24;
const babyAges = ["0-6m", "6m", "12m", "18m"];

function ProductsInner() {
  const { t, locale } = useLang();
  const params = useSearchParams();
  const catParam = params.get("cat") as CategoryKey | null;
  const ageParam = params.get("age");
  const priceParam = params.get("price");
  const collection = params.get("collection");

  const [cat, setCat] = useState<CategoryKey | "all">(
    catParam && categories.some((c) => c.key === catParam) ? catParam : "all"
  );
  const age = ageParam && [...babyAges, "2y", "3y"].includes(ageParam) ? ageParam : null;
  const price = priceParam && ["u30", "30-60", "60-100", "o100"].includes(priceParam) ? priceParam : null;
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCat(catParam && categories.some((c) => c.key === catParam) ? catParam : "all");
    setPage(1);
  }, [catParam]);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = cat === "all" ? products : products.filter((p) => p.category === cat);
    if (age) {
      list = babyAges.includes(age)
        ? list.filter((p) => p.category === "baby")
        : list.filter((p) => p.category !== "baby");
    }
    if (price === "u30") list = list.filter((p) => p.price < 30);
    else if (price === "30-60") list = list.filter((p) => p.price >= 30 && p.price < 60);
    else if (price === "60-100") list = list.filter((p) => p.price >= 60 && p.price < 100);
    else if (price === "o100") list = list.filter((p) => p.price >= 100);
    if (collection === "bestseller") list = list.filter((p) => p.featured);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    return list;
  }, [cat, age, price, collection, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const activeCat = categories.find((c) => c.key === cat);
  const priceTitles: Record<string, string> = {
    u30: locale === "de" ? "Bis 30 €" : "Under €30",
    "30-60": "30–60 €",
    "60-100": "60–100 €",
    o100: locale === "de" ? "Über 100 €" : "Over €100",
  };
  const ageTitles: Record<string, string> = {
    "0-6m": "0–6M",
    "6m": "6M+",
    "12m": "12M+",
    "18m": "18M+",
    "2y": "2 Yrs+",
    "3y": "3 Yrs+",
  };
  const title =
    collection === "bestseller"
      ? locale === "de" ? "Bestseller" : "Best Sellers"
      : price
      ? priceTitles[price]
      : age
      ? ageTitles[age]
      : cat === "all"
      ? t.nav.shop
      : locale === "de"
      ? activeCat!.de
      : activeCat!.en;

  const setCategory = (key: CategoryKey | "all") => {
    setCat(key);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-4xl font-extrabold text-forest">{title}</h1>
      <p className="mt-2 text-brown/70">
        {filtered.length} {locale === "de" ? "Produkte" : "products"}
      </p>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            cat === "all" ? "bg-mint-dark text-white" : "bg-white/70 text-brown hover:bg-white"
          }`}
        >
          {locale === "de" ? "Alle" : "All"}
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              cat === c.key ? "bg-mint-dark text-white" : "bg-white/70 text-brown hover:bg-white"
            }`}
          >
            <span className="mr-1">{c.icon}</span>
            {locale === "de" ? c.de : c.en}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder={locale === "de" ? "Suchen…" : "Search…"}
          className="w-full rounded-full border border-cream-dark bg-white px-5 py-2.5 text-sm outline-none focus:border-mint-dark sm:max-w-xs"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-full border border-cream-dark bg-white px-4 py-2.5 text-sm font-semibold text-brown outline-none focus:border-mint-dark"
        >
          <option value="featured">{locale === "de" ? "Empfohlen" : "Featured"}</option>
          <option value="price-asc">{locale === "de" ? "Preis: aufsteigend" : "Price: low to high"}</option>
          <option value="price-desc">{locale === "de" ? "Preis: absteigend" : "Price: high to low"}</option>
          <option value="name">{locale === "de" ? "Name (A–Z)" : "Name (A–Z)"}</option>
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-brown/60">{locale === "de" ? "Nichts gefunden." : "Nothing found."}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setPage(current - 1)}
            disabled={current === 1}
            className="rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-brown disabled:opacity-40"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((n) => n === 1 || n === totalPages || Math.abs(n - current) <= 2)
            .map((n, idx, arr) => (
              <span key={n} className="flex items-center">
                {idx > 0 && n - arr[idx - 1] > 1 && <span className="px-1 text-brown/40">…</span>}
                <button
                  onClick={() => setPage(n)}
                  className={`h-9 w-9 rounded-full text-sm font-bold transition ${
                    n === current ? "bg-mint-dark text-white" : "bg-white/70 text-brown hover:bg-white"
                  }`}
                >
                  {n}
                </button>
              </span>
            ))}
          <button
            onClick={() => setPage(current + 1)}
            disabled={current === totalPages}
            className="rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-brown disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-12" />}>
      <ProductsInner />
    </Suspense>
  );
}
