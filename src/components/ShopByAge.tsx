"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/products";
import { useLang } from "@/context/LanguageContext";

const ageOptions = [
  { value: "0-6m", label: "0–6M" },
  { value: "6m", label: "6M+" },
  { value: "12m", label: "12M+" },
  { value: "18m", label: "18M+" },
  { value: "2y", label: "2 Yrs+" },
  { value: "3y", label: "3 Yrs+" },
];

export default function ShopByAge() {
  const { locale } = useLang();
  const router = useRouter();
  const [age, setAge] = useState("");
  const [cat, setCat] = useState("");

  const search = () => {
    const params = new URLSearchParams();
    if (age) params.set("age", age);
    if (cat) params.set("cat", cat);
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid items-center gap-8 rounded-3xl bg-mint/25 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-display text-2xl font-extrabold uppercase tracking-wide text-mint-dark">
            {locale === "de" ? "Freude entdecken" : "Discover Joyful"}
          </p>
          <p className="mt-2 text-brown/70">
            {locale === "de"
              ? "Finde das passende Spielzeug nach Alter und Kategorie."
              : "Find the right toy by age and category."}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm font-bold text-forest">
            {locale === "de" ? "Nach Alter*" : "Shop By Age*"}
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white bg-white px-4 py-3 text-sm font-semibold text-brown outline-none focus:border-mint-dark"
            >
              <option value="">{locale === "de" ? "— Auswählen —" : "— Select —"}</option>
              {ageOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex-1 text-sm font-bold text-forest">
            {locale === "de" ? "Kategorie" : "Toy Categories"}
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white bg-white px-4 py-3 text-sm font-semibold text-brown outline-none focus:border-mint-dark"
            >
              <option value="">{locale === "de" ? "— Auswählen —" : "— Select —"}</option>
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {locale === "de" ? c.de : c.en}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={search}
            className="rounded-xl bg-forest px-8 py-3 font-bold text-white transition hover:bg-mint-dark"
          >
            {locale === "de" ? "Suchen" : "Search"}
          </button>
        </div>
      </div>
    </section>
  );
}
