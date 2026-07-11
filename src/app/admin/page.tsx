"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface LineItem {
  description: string;
  qty: number;
  price: number; // per unit
}

const seller = {
  name: "Heldenspielzeug GmbH",
  address: "Langer Anger 60",
  city: "69115 Heidelberg",
  country: "Deutschland",
  email: "leusalexander95@outlook.com",
  phone: "+49 1577 6227819",
  vat: "DE367593464",
  register: "Amtsgericht Mannheim, HRB 750755",
  managing: "Alexander Leus",
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nextInvoiceNo() {
  const year = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000);
  return `RE-${year}-${n}`;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hs_admin") === "1") setAuthed(true);
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error();
      sessionStorage.setItem("hs_admin", "1");
      setAuthed(true);
    } catch {
      setLoginError("Falsches Passwort");
    } finally {
      setChecking(false);
    }
  };

  // Invoice state
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState({ name: "", address: "", city: "", country: "Deutschland", email: "" });
  const [items, setItems] = useState<LineItem[]>([{ description: "", qty: 1, price: 0 }]);
  const [gross, setGross] = useState(true); // prices include VAT
  const [vatRate, setVatRate] = useState(19);
  const [note, setNote] = useState("Zahlbar innerhalb von 14 Tagen. Vielen Dank für Ihren Einkauf!");

  useEffect(() => {
    setInvoiceNo(nextInvoiceNo());
    setDate(todayISO());
  }, []);

  const totalWithTax = items.reduce((s, i) => s + i.qty * i.price, 0);
  const net = gross ? totalWithTax / (1 + vatRate / 100) : totalWithTax;
  const vat = gross ? totalWithTax - net : totalWithTax * (vatRate / 100);
  const grossTotal = gross ? totalWithTax : totalWithTax + vat;

  const eur = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  const updateItem = (idx: number, patch: Partial<LineItem>) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const addItem = () => setItems((prev) => [...prev, { description: "", qty: 1, price: 0 }]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pw = doc.internal.pageSize.getWidth();
    const marginL = 15;

    // Seller header (right)
    doc.setFontSize(10);
    doc.setTextColor(60);
    const sellerLines = [seller.name, seller.address, seller.city, seller.country, seller.email, seller.phone];
    sellerLines.forEach((l, i) => doc.text(l, pw - 15, 18 + i * 5, { align: "right" }));

    // Title
    doc.setFontSize(22);
    doc.setTextColor(31, 61, 43);
    doc.text("Rechnung", marginL, 30);

    // Bill to
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text("Rechnung an:", marginL, 45);
    doc.setTextColor(20);
    const custLines = [customer.name, customer.address, customer.city, customer.country, customer.email].filter(Boolean);
    custLines.forEach((l, i) => doc.text(l, marginL, 51 + i * 5));

    // Meta
    doc.setTextColor(60);
    doc.text(`Rechnungsnummer: ${invoiceNo}`, pw - 15, 50, { align: "right" });
    doc.text(`Datum: ${date}`, pw - 15, 55, { align: "right" });

    // Items table
    autoTable(doc, {
      startY: 85,
      head: [["Pos.", "Beschreibung", "Menge", "Einzelpreis", "Gesamt"]],
      body: items.map((it, i) => [
        String(i + 1),
        it.description,
        String(it.qty),
        eur(it.price),
        eur(it.qty * it.price),
      ]),
      styles: { fontSize: 9, cellPadding: 2.5 },
      headStyles: { fillColor: [124, 174, 138], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 14 },
        2: { cellWidth: 20, halign: "right" },
        3: { cellWidth: 30, halign: "right" },
        4: { cellWidth: 30, halign: "right" },
      },
    });

    // Totals
    // @ts-expect-error lastAutoTable is added by the plugin
    let y = (doc.lastAutoTable?.finalY ?? 95) + 8;
    const rightX = pw - 15;
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Nettobetrag:`, rightX - 40, y, { align: "right" });
    doc.text(eur(net), rightX, y, { align: "right" });
    y += 5;
    doc.text(`zzgl. ${vatRate}% MwSt.:`, rightX - 40, y, { align: "right" });
    doc.text(eur(vat), rightX, y, { align: "right" });
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(31, 61, 43);
    doc.text(`Gesamtbetrag:`, rightX - 40, y, { align: "right" });
    doc.text(eur(grossTotal), rightX, y, { align: "right" });

    // Note + legal footer
    y += 14;
    doc.setFontSize(9);
    doc.setTextColor(90);
    doc.text(doc.splitTextToSize(note, pw - 30), marginL, y);

    const footY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      `${seller.name} · ${seller.register} · USt-IdNr. ${seller.vat} · Geschäftsführer: ${seller.managing}`,
      pw / 2,
      footY,
      { align: "center" }
    );

    doc.save(`${invoiceNo}.pdf`);
  };

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
        <h1 className="font-display text-3xl font-extrabold text-forest">Admin</h1>
        <p className="mt-2 text-sm text-brown/70">Bitte Passwort eingeben.</p>
        <form onSubmit={login} className="mt-6 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            className="w-full rounded-xl border border-cream-dark bg-white px-4 py-3 outline-none focus:border-mint-dark"
          />
          {loginError && <p className="text-sm font-semibold text-orange">{loginError}</p>}
          <button
            type="submit"
            disabled={checking}
            className="w-full rounded-full bg-mint-dark px-6 py-3 font-bold text-white transition hover:bg-forest disabled:opacity-60"
          >
            {checking ? "…" : "Anmelden"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold text-forest">Rechnung erstellen</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("hs_admin");
            setAuthed(false);
          }}
          className="text-sm font-semibold text-brown/60 hover:text-brown"
        >
          Abmelden
        </button>
      </div>

      {/* Invoice meta */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-brown">
          Rechnungsnummer
          <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="mt-1 w-full rounded-xl border border-cream-dark bg-white px-3 py-2 font-normal" />
        </label>
        <label className="text-sm font-bold text-brown">
          Datum
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-xl border border-cream-dark bg-white px-3 py-2 font-normal" />
        </label>
      </div>

      {/* Customer */}
      <h2 className="mt-8 font-display text-lg font-bold text-forest">Kunde</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <input placeholder="Name / Firma" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="rounded-xl border border-cream-dark bg-white px-3 py-2" />
        <input placeholder="E-Mail" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="rounded-xl border border-cream-dark bg-white px-3 py-2" />
        <input placeholder="Straße und Hausnummer" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="rounded-xl border border-cream-dark bg-white px-3 py-2" />
        <input placeholder="PLZ und Ort" value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} className="rounded-xl border border-cream-dark bg-white px-3 py-2" />
      </div>

      {/* Items */}
      <h2 className="mt-8 font-display text-lg font-bold text-forest">Positionen</h2>
      <div className="mt-3 space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2">
            <input
              placeholder="Beschreibung"
              value={it.description}
              onChange={(e) => updateItem(idx, { description: e.target.value })}
              className="col-span-6 rounded-xl border border-cream-dark bg-white px-3 py-2 text-sm"
            />
            <input
              type="number"
              min={1}
              value={it.qty}
              onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
              className="col-span-2 rounded-xl border border-cream-dark bg-white px-3 py-2 text-sm"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              value={it.price}
              onChange={(e) => updateItem(idx, { price: Number(e.target.value) })}
              className="col-span-3 rounded-xl border border-cream-dark bg-white px-3 py-2 text-sm"
            />
            <button
              onClick={() => removeItem(idx)}
              className="col-span-1 rounded-xl bg-cream-dark text-brown hover:bg-orange hover:text-white"
              title="Entfernen"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="mt-3 rounded-full bg-cream-dark px-4 py-2 text-sm font-bold text-brown hover:bg-mint hover:text-white">
        + Position hinzufügen
      </button>

      {/* Options */}
      <div className="mt-6 flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-brown">
          <input type="checkbox" checked={gross} onChange={(e) => setGross(e.target.checked)} />
          Preise inkl. MwSt (Brutto)
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-brown">
          MwSt %
          <input type="number" value={vatRate} onChange={(e) => setVatRate(Number(e.target.value))} className="w-16 rounded-xl border border-cream-dark bg-white px-2 py-1" />
        </label>
      </div>

      <label className="mt-4 block text-sm font-bold text-brown">
        Hinweis / Zahlungsbedingungen
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-cream-dark bg-white px-3 py-2 font-normal" />
      </label>

      {/* Totals preview */}
      <div className="mt-6 rounded-2xl bg-white/70 p-5 text-sm">
        <div className="flex justify-between"><span className="text-brown/70">Netto</span><span className="font-bold">{eur(net)}</span></div>
        <div className="flex justify-between"><span className="text-brown/70">MwSt {vatRate}%</span><span className="font-bold">{eur(vat)}</span></div>
        <div className="mt-2 flex justify-between border-t border-cream-dark pt-2 text-base"><span className="font-bold text-brown">Gesamt</span><span className="font-display font-extrabold text-forest">{eur(grossTotal)}</span></div>
      </div>

      <button
        onClick={downloadPdf}
        className="mt-6 w-full rounded-full bg-forest px-6 py-3.5 font-bold text-white transition hover:bg-mint-dark"
      >
        PDF herunterladen
      </button>
    </div>
  );
}
