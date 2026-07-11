"use client";

export default function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold text-forest">{title}</h1>
      <div className="legal mt-8 space-y-5 text-brown/85 leading-relaxed">{children}</div>
    </div>
  );
}
