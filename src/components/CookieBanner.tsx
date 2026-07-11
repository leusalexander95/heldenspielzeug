"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function CookieBanner() {
  const { locale } = useLang();
  const de = locale === "de";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setShow(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-2xl bg-white p-5 shadow-2xl shadow-brown/20 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-brown/85">
          {de ? (
            <>
              Wir verwenden Cookies, um unsere Website optimal zu gestalten. Mehr in der{" "}
              <Link href="/datenschutz" className="font-semibold text-mint-dark underline">Datenschutzerklärung</Link>.
            </>
          ) : (
            <>
              We use cookies to make our website work best for you. More in our{" "}
              <Link href="/datenschutz" className="font-semibold text-mint-dark underline">privacy policy</Link>.
            </>
          )}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide("declined")}
            className="rounded-full border-2 border-brown/20 px-5 py-2 text-sm font-bold text-brown transition hover:border-brown/40"
          >
            {de ? "Ablehnen" : "Decline"}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full bg-mint-dark px-5 py-2 text-sm font-bold text-white transition hover:bg-forest"
          >
            {de ? "Akzeptieren" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
