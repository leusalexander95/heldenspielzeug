"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { getProduct, formatPrice } from "@/data/products";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const { t, locale } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const rows = items.map((i) => ({ item: i, product: getProduct(i.slug)! })).filter((r) => r.product);
  const total = rows.reduce((sum, r) => sum + r.product.price * r.item.qty, 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.phone.trim()) {
      setError(t.checkout.required);
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.note,
          items: rows.map((r) => ({ name: r.product.name, qty: r.item.qty, price: r.product.price })),
          total,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
      clear();
    } catch {
      setError(locale === "de" ? "Senden fehlgeschlagen. Bitte später erneut versuchen." : "Sending failed. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="text-6xl">✅</div>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-forest">{t.checkout.title}</h1>
        <p className="mt-4 text-brown/80">{t.checkout.success}</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-mint-dark px-7 py-3 font-bold text-white transition hover:bg-forest">
          {t.checkout.backHome}
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold text-forest">{t.cart.empty}</h1>
        <Link href="/products" className="mt-6 inline-block rounded-full bg-mint-dark px-7 py-3 font-bold text-white transition hover:bg-forest">
          {t.cart.continue}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-extrabold text-forest">{t.checkout.title}</h1>
      <p className="mt-3 max-w-xl text-brown/75">{t.checkout.intro}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white/70 p-7">
          <div>
            <label className="mb-1 block text-sm font-bold text-brown">{t.checkout.name}</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold text-brown">{t.checkout.email} *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-brown">{t.checkout.phone} *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-brown">{t.checkout.note}</label>
            <textarea
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
            />
          </div>
          {error && <p className="text-sm font-semibold text-orange">{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-mint-dark px-6 py-3.5 font-bold text-white transition hover:bg-forest disabled:opacity-60"
          >
            {sending ? (locale === "de" ? "Wird gesendet…" : "Sending…") : t.checkout.submit}
          </button>
        </form>

        <div className="h-fit rounded-3xl bg-white/70 p-6">
          <h3 className="font-display text-lg font-bold text-brown">{t.checkout.summary}</h3>
          <ul className="mt-4 space-y-3">
            {rows.map(({ item, product }) => (
              <li key={item.slug} className="flex justify-between gap-3 text-sm">
                <span className="text-brown/80">{product.name} × {item.qty}</span>
                <span className="font-bold text-forest">{formatPrice(product.price * item.qty, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-cream-dark pt-4">
            <span className="font-bold text-brown">{t.cart.total}</span>
            <span className="font-display text-xl font-extrabold text-forest">{formatPrice(total, locale)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
