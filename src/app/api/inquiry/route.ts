import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Where inquiries are delivered. Overridable via env.
const TO_EMAIL = process.env.INQUIRY_TO_EMAIL || "leusalexander95@outlook.com";
// Verified sender. With Resend's test setup you can use onboarding@resend.dev.
const FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL || "Heldenspielzeug <onboarding@resend.dev>";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface InquiryBody {
  type: "order" | "contact";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  items?: OrderItem[];
  total?: number;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: InquiryBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, name, email, phone, message, items, total } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (type === "order" && !phone) {
    return NextResponse.json({ error: "Phone required" }, { status: 400 });
  }
  if (type === "contact" && !message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const isOrder = type === "order";
  const subject = isOrder
    ? `Neue Bestellanfrage von ${name || email}`
    : `Neue Kontaktanfrage von ${name || email}`;

  const itemRows =
    items && items.length
      ? items
          .map(
            (i) =>
              `<tr><td style="padding:4px 8px">${escapeHtml(i.name)}</td><td style="padding:4px 8px">× ${i.qty}</td><td style="padding:4px 8px">${(i.price * i.qty).toFixed(2)} €</td></tr>`
          )
          .join("")
      : "";

  const html = `
    <div style="font-family:sans-serif;color:#2f2a26">
      <h2 style="color:#1f3d2b">${isOrder ? "Bestellanfrage" : "Kontaktanfrage"}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name || "—")}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${message ? `<p><strong>Nachricht:</strong><br>${escapeHtml(message)}</p>` : ""}
      ${
        itemRows
          ? `<h3 style="color:#1f3d2b">Warenkorb</h3>
             <table style="border-collapse:collapse">${itemRows}</table>
             <p><strong>Gesamt:</strong> ${(total ?? 0).toFixed(2)} €</p>`
          : ""
      }
    </div>`;

  if (!RESEND_API_KEY) {
    // Not configured yet: log so the submission is not silently lost in dev.
    console.warn("[inquiry] RESEND_API_KEY not set — email not sent. Payload:", {
      type,
      name,
      email,
      phone,
      message,
      items,
      total,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[inquiry] send failed:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
