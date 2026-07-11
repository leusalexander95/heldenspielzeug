"use client";

import { useLang } from "@/context/LanguageContext";

export default function AboutPage() {
  const { locale } = useLang();

  const c =
    locale === "de"
      ? {
          title: "Über Heldenspielzeug",
          lead: "Wir glauben: Gutes Spielzeug wächst mit. Deshalb wählen wir nachhaltiges Holzspielzeug und Bau-Sets aus, die Kinder über Jahre begleiten – fair produziert und aus Liebe zum Spiel.",
          storyT: "Von Bäumen zu Spielzeug",
          story:
            "Heldenspielzeug ist ein Familienunternehmen aus Heidelberg. Wir setzen auf schadstofffreie Materialien, wasserbasierte Farben und langlebige Qualität. Jedes Produkt in unserem Sortiment wählen wir sorgfältig danach aus, ob es Fantasie, Bewegung und nachhaltiges Denken fördert.",
          valuesT: "Unsere Werte",
          values: [
            { t: "Nachhaltig", d: "Holz aus verantwortungsvollem Anbau und plastikreduzierte Verpackung." },
            { t: "Sicher", d: "Geprüfte, schadstofffreie Materialien für sorgenfreies Spielen." },
            { t: "Fair", d: "Faire Produktion und langlebige Qualität, die weitergegeben wird." },
          ],
          imprint: "Impressum",
        }
      : {
          title: "About Heldenspielzeug",
          lead: "We believe good toys grow with the child. That's why we select sustainable wooden toys and construction sets that accompany children for years – fairly produced and made with love.",
          storyT: "From trees to toys",
          story:
            "Heldenspielzeug is a family business from Heidelberg. We rely on non-toxic materials, water-based paints and durable quality. We carefully choose every product for its ability to nurture imagination, movement and sustainable thinking.",
          valuesT: "Our values",
          values: [
            { t: "Sustainable", d: "Wood from responsible sources and plastic-reduced packaging." },
            { t: "Safe", d: "Tested, non-toxic materials for worry-free play." },
            { t: "Fair", d: "Fair production and lasting quality, made to be passed on." },
          ],
          imprint: "Imprint",
        };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold text-forest">{c.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-brown/80">{c.lead}</p>

      <div className="mt-12 rounded-3xl bg-white/70 p-8">
        <h2 className="font-display text-2xl font-extrabold text-forest">{c.storyT}</h2>
        <p className="mt-3 leading-relaxed text-brown/80">{c.story}</p>
      </div>

      <h2 className="mt-14 font-display text-2xl font-extrabold text-forest">{c.valuesT}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {c.values.map((v, i) => (
          <div key={i} className="rounded-3xl bg-white/70 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl" style={{ background: ["var(--mint)", "var(--yellow)", "var(--blue)"][i] }}>
              {["🌱", "🛡️", "🤝"][i]}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-brown">{v.t}</h3>
            <p className="mt-2 text-sm text-brown/70">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-cream-dark p-8 text-sm text-brown/80">
        <h2 className="font-display text-xl font-extrabold text-forest">{c.imprint}</h2>
        <div className="mt-4 grid gap-1">
          <span>Heldenspielzeug GmbH</span>
          <span>Langer Anger 60, 69115 Heidelberg, Deutschland</span>
          <span>HRB 750755, Amtsgericht Mannheim</span>
          <span>USt-IdNr.: DE367593464</span>
          <span>leusalexander95@outlook.com · +49 1577 6227819</span>
        </div>
      </div>
    </div>
  );
}
