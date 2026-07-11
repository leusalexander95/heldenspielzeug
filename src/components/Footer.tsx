"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { categories } from "@/data/products";

export default function Footer() {
  const { t, locale } = useLang();
  const de = locale === "de";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const legal = [
    { href: "/impressum", label: de ? "Impressum" : "Imprint" },
    { href: "/datenschutz", label: de ? "Datenschutz" : "Privacy" },
    { href: "/agb", label: de ? "AGB" : "Terms" },
    { href: "/widerruf", label: de ? "Widerruf" : "Withdrawal" },
    { href: "/versand", label: de ? "Versand & Zahlung" : "Shipping & Payment" },
    { href: "/faq", label: de ? "FAQ" : "FAQ" },
    { href: "/kontakt", label: de ? "Kontakt" : "Contact" },
  ];

  return (
    <footer className="mt-24">
      {/* Scenic newsletter band */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-[#eef8f0] to-[#cfe6d5]">
        {/* clouds */}
        <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto max-w-6xl px-10">
          <div className="flex justify-between opacity-70">
            <span className="h-3 w-16 rounded-full bg-[#bfe0f2]" />
            <span className="h-3 w-24 rounded-full bg-[#bfe0f2]" />
            <span className="h-3 w-14 rounded-full bg-[#bfe0f2]" />
          </div>
        </div>

        {/* curved headline */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-10">
          <svg viewBox="0 0 1000 130" className="w-full" role="img" aria-label={de ? "Bessere Kinder, bessere Welt durch nachhaltiges Spielen" : "Better Kids, Better World through Sustainable Play"}>
            <defs>
              <path id="footer-arc" d="M40,115 Q500,0 960,115" fill="none" />
            </defs>
            <text className="fill-orange font-display" fontSize="42" fontWeight="800" letterSpacing="1">
              <textPath href="#footer-arc" startOffset="50%" textAnchor="middle">
                {de ? "Bessere Kinder · Bessere Welt · Nachhaltiges Spielen" : "Better Kids · Better World · Sustainable Play"}
              </textPath>
            </text>
          </svg>
        </div>

        {/* hill with trees */}
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[70%] w-full" aria-hidden="true">
          <path d="M0,90 C360,20 1080,20 1440,90 L1440,220 L0,220 Z" fill="#bcdcc3" />
          <g fill="#1f3d2b">
            <polygon points="120,78 100,120 140,120" />
            <polygon points="150,88 132,124 168,124" />
            <polygon points="1290,80 1270,122 1310,122" />
            <polygon points="1330,90 1312,126 1348,126" />
          </g>
          <g fill="#7cae8a">
            <circle cx="300" cy="120" r="14" />
            <circle cx="1130" cy="118" r="12" />
          </g>
        </svg>

        {/* newsletter */}
        <div className="relative z-10 mx-auto max-w-xl px-6 pb-16 pt-4 text-center">
          <h3 className="font-display text-2xl font-extrabold text-forest">
            {de ? "Werde Teil der Heldenspielzeug-Familie!" : "Join the Heldenspielzeug Family!"}
          </h3>
          <p className="mt-2 text-sm text-brown/70">
            {de
              ? "Erhalte Neuigkeiten, exklusive Aktionen und Spiel-Inspiration."
              : "Receive news, exclusive promotions and play inspiration."}
          </p>
          {sent ? (
            <p className="mt-5 rounded-full bg-mint-dark px-6 py-3 font-bold text-white">
              {de ? "Danke! Du bist dabei." : "Thanks! You're in."}
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={de ? "E-Mail-Adresse" : "Email address"}
                className="flex-1 rounded-full border border-white bg-white px-5 py-3 text-sm outline-none focus:border-mint-dark"
              />
              <button
                type="submit"
                className="rounded-full bg-forest px-7 py-3 font-bold text-white transition hover:bg-mint-dark"
              >
                {de ? "Anmelden" : "Sign up"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Dark footer columns */}
      <div className="bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-extrabold">helden<span className="text-mint">spielzeug</span></div>
          <p className="mt-3 text-sm text-cream/70">{t.footer.tagline}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-mint">{t.footer.shop}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/products" className="hover:text-white">{t.nav.shop}</Link></li>
            {categories.slice(0, 6).map((c) => (
              <li key={c.key}>
                <Link href={`/products?cat=${c.key}`} className="hover:text-white">
                  {de ? c.de : c.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-mint">{de ? "Rechtliches & Hilfe" : "Legal & Help"}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-mint">{t.footer.contact}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>Heldenspielzeug GmbH</li>
            <li>Langer Anger 60</li>
            <li>69115 Heidelberg</li>
            <li><a href="mailto:leusalexander95@outlook.com" className="hover:text-white">leusalexander95@outlook.com</a></li>
            <li><a href="tel:+4915776227819" className="hover:text-white">+49 1577 6227819</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <div className="flex items-center gap-2 text-xs text-cream/70">
            <span>{de ? "Sichere Zahlung" : "Secure payment"}:</span>
            <span className="rounded bg-white px-2 py-1 text-[11px] font-bold text-[#1a1f71]">VISA</span>
            <span className="rounded bg-white px-2 py-1 text-[11px] font-bold text-[#eb001b]">Mastercard</span>
            <span className="rounded bg-white px-2 py-1 text-[11px] font-bold text-[#191c1f]">Revolut</span>
          </div>
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} Heldenspielzeug GmbH · {t.footer.rights}
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
