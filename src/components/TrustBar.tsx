"use client";

import { useLang } from "@/context/LanguageContext";

const items = [
  {
    icon: "🔒",
    de: { t: "Sichere Zahlung", s: "Verschlüsselt via Visa, Mastercard & Revolut" },
    en: { t: "Secure payment", s: "Encrypted via Visa, Mastercard & Revolut" },
  },
  {
    icon: "🚚",
    de: { t: "Schneller Versand", s: "2–4 Werktage innerhalb Deutschlands" },
    en: { t: "Fast shipping", s: "2–4 business days within Germany" },
  },
  {
    icon: "↩️",
    de: { t: "14 Tage Rückgabe", s: "Gesetzliches Widerrufsrecht" },
    en: { t: "14-day returns", s: "Statutory right of withdrawal" },
  },
  {
    icon: "🌱",
    de: { t: "Nachhaltig & sicher", s: "Holz aus verantwortungsvoller Herkunft, EN 71" },
    en: { t: "Sustainable & safe", s: "Responsibly sourced wood, EN 71" },
  },
];

export default function TrustBar() {
  const { locale } = useLang();
  const de = locale === "de";

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-4 rounded-3xl bg-white/70 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.icon} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint/30 text-xl">
              {it.icon}
            </span>
            <div>
              <p className="font-display text-sm font-bold text-forest">{de ? it.de.t : it.en.t}</p>
              <p className="text-xs text-brown/60">{de ? it.de.s : it.en.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
