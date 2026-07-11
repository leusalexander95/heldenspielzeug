"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function KontaktPage() {
  const { locale } = useLang();
  const de = locale === "de";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.message.trim()) {
      setError(de ? "Bitte E-Mail und Nachricht angeben." : "Please provide email and message.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
    } catch {
      setError(de ? "Senden fehlgeschlagen. Bitte später erneut versuchen." : "Sending failed. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold text-forest">{de ? "Kontakt" : "Contact"}</h1>
      <p className="mt-3 max-w-xl text-brown/75">
        {de
          ? "Fragen zu einem Produkt oder deiner Bestellung? Schreib uns – wir melden uns schnellstmöglich."
          : "Questions about a product or your order? Write to us – we'll get back to you as soon as possible."}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {done ? (
          <div className="rounded-3xl bg-white/70 p-8">
            <div className="text-5xl">✅</div>
            <p className="mt-4 text-brown/85">
              {de
                ? "Vielen Dank für deine Nachricht! Wir melden uns in Kürze."
                : "Thank you for your message! We'll be in touch shortly."}
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white/70 p-7">
            <div>
              <label className="mb-1 block text-sm font-bold text-brown">{de ? "Name" : "Name"}</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-brown">{de ? "E-Mail" : "Email"} *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-brown">{de ? "Nachricht" : "Message"} *</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
              />
            </div>
            {error && <p className="text-sm font-semibold text-orange">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-mint-dark px-6 py-3.5 font-bold text-white transition hover:bg-forest disabled:opacity-60"
            >
              {sending ? (de ? "Wird gesendet…" : "Sending…") : de ? "Nachricht senden" : "Send message"}
            </button>
          </form>
        )}

        <div className="h-fit rounded-3xl bg-white/70 p-6 text-sm text-brown/85">
          <h3 className="font-display text-lg font-bold text-brown">Heldenspielzeug GmbH</h3>
          <div className="mt-3 space-y-1">
            <p>Langer Anger 60</p>
            <p>69115 Heidelberg, {de ? "Deutschland" : "Germany"}</p>
            <p className="pt-2">
              <a href="mailto:leusalexander95@outlook.com" className="text-mint-dark hover:underline">
                leusalexander95@outlook.com
              </a>
            </p>
            <p>
              <a href="tel:+4915776227819" className="text-mint-dark hover:underline">
                +49 1577 6227819
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
