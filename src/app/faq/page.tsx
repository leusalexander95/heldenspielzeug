"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

interface QA {
  q: { de: string; en: string };
  a: { de: string; en: string };
}

const faqs: QA[] = [
  {
    q: { de: "Wie kann ich bestellen?", en: "How can I order?" },
    a: {
      de: "Legen Sie die gewünschten Artikel in den Warenkorb und schließen Sie den Bestellvorgang ab. Anschließend erhalten Sie von uns eine Bestätigung sowie einen sicheren Zahlungslink per E-Mail.",
      en: "Add the items you want to the cart and complete the checkout. You will then receive a confirmation and a secure payment link from us by email.",
    },
  },
  {
    q: { de: "Welche Zahlungsmethoden werden akzeptiert?", en: "Which payment methods do you accept?" },
    a: {
      de: "Wir akzeptieren gängige Karten (Visa, Mastercard) sowie Zahlungen über Revolut. Die Abwicklung erfolgt über einen verschlüsselten, sicheren Zahlungslink.",
      en: "We accept common cards (Visa, Mastercard) as well as Revolut payments. Processing is handled via an encrypted, secure payment link.",
    },
  },
  {
    q: { de: "Wie lange dauert der Versand?", en: "How long does shipping take?" },
    a: {
      de: "Innerhalb Deutschlands beträgt die Lieferzeit in der Regel 2–4 Werktage. In andere EU-Länder 4–7 Werktage.",
      en: "Within Germany delivery usually takes 2–4 business days. To other EU countries 4–7 business days.",
    },
  },
  {
    q: { de: "Kann ich Artikel zurückgeben?", en: "Can I return items?" },
    a: {
      de: "Ja. Sie haben ein 14-tägiges Widerrufsrecht ab Erhalt der Ware. Details finden Sie in unserer Widerrufsbelehrung.",
      en: "Yes. You have a 14-day right of withdrawal from receipt of the goods. Details can be found in our withdrawal policy.",
    },
  },
  {
    q: { de: "Sind die Spielzeuge sicher und nachhaltig?", en: "Are the toys safe and sustainable?" },
    a: {
      de: "Alle Produkte bestehen aus nachhaltigem Holz und schadstofffreien Materialien und erfüllen die EU-Sicherheitsnormen für Spielzeug (EN 71).",
      en: "All products are made from sustainable wood and non-toxic materials and comply with EU toy safety standards (EN 71).",
    },
  },
  {
    q: { de: "Für welches Alter sind die Spielzeuge geeignet?", en: "What age are the toys suitable for?" },
    a: {
      de: "Jedes Produkt hat eine Altersempfehlung, die auf der Produktseite angegeben ist. Sie können auch bequem „Nach Alter“ im Menü filtern.",
      en: "Each product has an age recommendation shown on the product page. You can also filter conveniently by 'Shop by Age' in the menu.",
    },
  },
  {
    q: { de: "Wie erreiche ich den Kundenservice?", en: "How do I reach customer service?" },
    a: {
      de: "Schreiben Sie uns an leusalexander95@outlook.com oder rufen Sie +49 1577 6227819 an. Wir antworten in der Regel innerhalb eines Werktages.",
      en: "Email us at leusalexander95@outlook.com or call +49 1577 6227819. We usually respond within one business day.",
    },
  },
];

export default function FaqPage() {
  const { locale } = useLang();
  const de = locale === "de";
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.de,
      acceptedAnswer: { "@type": "Answer", text: f.a.de },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-display text-4xl font-extrabold text-forest">{de ? "Häufige Fragen" : "FAQ"}</h1>
      <p className="mt-3 text-brown/70">
        {de ? "Antworten auf die häufigsten Fragen rund um Bestellung, Versand und Produkte." : "Answers to the most common questions about ordering, shipping and products."}
      </p>

      <div className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white/70">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-bold text-forest"
            >
              {de ? f.q.de : f.q.en}
              <span className="shrink-0 text-mint-dark">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="px-5 pb-5 leading-relaxed text-brown/80">{de ? f.a.de : f.a.en}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
