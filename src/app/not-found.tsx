"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function NotFound() {
  const { locale } = useLang();
  const de = locale === "de";
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <div className="font-display text-7xl font-extrabold text-mint-dark">404</div>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-forest">
        {de ? "Seite nicht gefunden" : "Page not found"}
      </h1>
      <p className="mt-3 text-brown/70">
        {de
          ? "Diese Seite gibt es leider nicht. Vielleicht findest du im Shop, was du suchst."
          : "This page doesn't exist. Maybe you'll find what you're looking for in the shop."}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-mint-dark px-7 py-3 font-bold text-white transition hover:bg-forest">
          {de ? "Zur Startseite" : "Back home"}
        </Link>
        <Link href="/products" className="rounded-full border-2 border-brown/20 px-7 py-3 font-bold text-brown transition hover:border-mint-dark hover:text-mint-dark">
          {de ? "Zum Shop" : "To the shop"}
        </Link>
      </div>
    </div>
  );
}
