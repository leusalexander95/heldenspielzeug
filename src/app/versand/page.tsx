"use client";

import LegalLayout from "@/components/LegalLayout";
import { useLang } from "@/context/LanguageContext";

export default function VersandPage() {
  const { locale } = useLang();
  const de = locale === "de";

  if (de) {
    return (
      <LegalLayout title="Versand & Zahlung">
        <h2>Versandkosten</h2>
        <ul>
          <li>Standardversand innerhalb Deutschlands: 4,90 €</li>
          <li>Kostenloser Versand ab einem Bestellwert von 50 €</li>
          <li>Versand in die EU &amp; Schweiz: nach Aufwand, wird vor Bestellabschluss angezeigt</li>
        </ul>

        <h2>Lieferzeit</h2>
        <p>
          Die Lieferzeit beträgt in der Regel 2–5 Werktage innerhalb Deutschlands. Für Lieferungen ins Ausland kann
          die Lieferzeit abweichen. Sie erhalten eine Sendungsverfolgung, sobald Ihre Bestellung versandt wurde.
        </p>

        <h2>Zahlungsarten</h2>
        <ul>
          <li>Kreditkarte (Visa, Mastercard)</li>
          <li>Sichere Zahlung über einen Zahlungslink</li>
        </ul>
        <p>
          Alle Zahlungen werden über eine gesicherte, verschlüsselte Verbindung abgewickelt. Ihre Zahlungsdaten werden
          niemals unverschlüsselt gespeichert.
        </p>

        <h2>Rückgabe</h2>
        <p>
          Sie haben ein 14-tägiges Widerrufsrecht. Details finden Sie in unserer Widerrufsbelehrung.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Shipping & Payment">
      <h2>Shipping costs</h2>
      <ul>
        <li>Standard shipping within Germany: €4.90</li>
        <li>Free shipping on orders over €50</li>
        <li>Shipping to the EU &amp; Switzerland: calculated and shown before checkout</li>
      </ul>

      <h2>Delivery time</h2>
      <p>
        Delivery usually takes 2–5 working days within Germany. Delivery times abroad may vary. You will receive
        tracking information once your order has shipped.
      </p>

      <h2>Payment methods</h2>
      <ul>
        <li>Credit card (Visa, Mastercard)</li>
        <li>Secure payment via a payment link</li>
      </ul>
      <p>
        All payments are processed over a secure, encrypted connection. Your payment data is never stored unencrypted.
      </p>

      <h2>Returns</h2>
      <p>You have a 14-day right of withdrawal. Details can be found in our withdrawal policy.</p>
    </LegalLayout>
  );
}
