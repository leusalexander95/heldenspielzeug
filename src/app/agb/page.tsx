"use client";

import LegalLayout from "@/components/LegalLayout";
import { useLang } from "@/context/LanguageContext";

export default function AgbPage() {
  const { locale } = useLang();
  const de = locale === "de";

  if (de) {
    return (
      <LegalLayout title="Allgemeine Geschäftsbedingungen (AGB)">
        <h2>§ 1 Geltungsbereich</h2>
        <p>
          Für alle Bestellungen über unseren Onlineshop gelten die nachfolgenden Allgemeinen Geschäftsbedingungen.
          Vertragspartner ist die Heldenspielzeug GmbH, Langer Anger 60, 69115 Heidelberg.
        </p>

        <h2>§ 2 Vertragspartner &amp; Vertragsschluss</h2>
        <p>
          Die Darstellung der Produkte im Onlineshop stellt kein rechtlich bindendes Angebot dar, sondern eine
          Aufforderung zur Bestellung. Mit dem Absenden einer Anfrage geben Sie ein verbindliches Angebot ab. Der
          Kaufvertrag kommt zustande, sobald wir Ihre Anfrage per E-Mail bestätigen bzw. Ihnen einen Zahlungslink
          zusenden und die Zahlung erfolgt.
        </p>

        <h2>§ 3 Preise</h2>
        <p>
          Alle Preise verstehen sich in Euro (€) und enthalten die gesetzliche Mehrwertsteuer, sofern nicht anders
          angegeben. Versandkosten werden vor Vertragsschluss gesondert ausgewiesen.
        </p>

        <h2>§ 4 Zahlung</h2>
        <p>
          Die Zahlung erfolgt per Kreditkarte oder über die im Bestellprozess angebotenen Zahlungsarten. Der
          Rechnungsbetrag ist mit Vertragsschluss fällig.
        </p>

        <h2>§ 5 Lieferung</h2>
        <p>
          Die Lieferung erfolgt an die von Ihnen angegebene Lieferadresse. Lieferzeiten und Versandkosten entnehmen Sie
          bitte unserer Seite „Versand &amp; Zahlung“.
        </p>

        <h2>§ 6 Widerrufsrecht</h2>
        <p>
          Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten finden Sie in unserer
          Widerrufsbelehrung.
        </p>

        <h2>§ 7 Gewährleistung</h2>
        <p>
          Es gelten die gesetzlichen Gewährleistungsrechte. Bei Mängeln haben Sie Anspruch auf Nacherfüllung, ggf.
          Minderung oder Rücktritt nach den gesetzlichen Vorschriften.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Terms and Conditions">
      <h2>§ 1 Scope</h2>
      <p>
        The following terms and conditions apply to all orders placed via our online shop. Your contractual partner is
        Heldenspielzeug GmbH, Langer Anger 60, 69115 Heidelberg, Germany.
      </p>

      <h2>§ 2 Contractual partner &amp; conclusion of contract</h2>
      <p>
        The presentation of products in the online shop does not constitute a legally binding offer but an invitation to
        order. By submitting an enquiry you make a binding offer. The purchase contract is concluded once we confirm
        your enquiry by email or send you a payment link and payment is made.
      </p>

      <h2>§ 3 Prices</h2>
      <p>
        All prices are in euros (€) and include statutory VAT unless stated otherwise. Shipping costs are shown
        separately before the contract is concluded.
      </p>

      <h2>§ 4 Payment</h2>
      <p>
        Payment is made by credit card or via the payment methods offered during the order process. The invoice amount
        is due upon conclusion of the contract.
      </p>

      <h2>§ 5 Delivery</h2>
      <p>
        Delivery is made to the delivery address you provide. Please refer to our “Shipping &amp; Payment” page for
        delivery times and shipping costs.
      </p>

      <h2>§ 6 Right of withdrawal</h2>
      <p>Consumers have a statutory right of withdrawal. Details can be found in our withdrawal policy.</p>

      <h2>§ 7 Warranty</h2>
      <p>
        Statutory warranty rights apply. In the event of defects you are entitled to subsequent performance and, where
        applicable, a price reduction or withdrawal in accordance with statutory provisions.
      </p>
    </LegalLayout>
  );
}
