"use client";

import LegalLayout from "@/components/LegalLayout";
import { useLang } from "@/context/LanguageContext";

export default function ImpressumPage() {
  const { locale } = useLang();
  const de = locale === "de";

  return (
    <LegalLayout title={de ? "Impressum" : "Imprint"}>
      <h2>{de ? "Angaben gemäß § 5 TMG" : "Information according to § 5 TMG"}</h2>
      <p>
        Heldenspielzeug GmbH<br />
        Langer Anger 60<br />
        69115 Heidelberg<br />
        {de ? "Deutschland" : "Germany"}
      </p>

      <h2>{de ? "Vertreten durch" : "Represented by"}</h2>
      <p>{de ? "Geschäftsführer" : "Managing Director"}: Alexander Leus</p>

      <h2>{de ? "Kontakt" : "Contact"}</h2>
      <p>
        {de ? "Telefon" : "Phone"}: <a href="tel:+4915776227819">+49 1577 6227819</a><br />
        {de ? "E-Mail" : "Email"}: <a href="mailto:leusalexander95@outlook.com">leusalexander95@outlook.com</a>
      </p>

      <h2>{de ? "Registereintrag" : "Register entry"}</h2>
      <p>
        {de ? "Eintragung im Handelsregister" : "Registered in the commercial register"}<br />
        {de ? "Registergericht" : "Register court"}: Amtsgericht Mannheim<br />
        {de ? "Registernummer" : "Register number"}: HRB 750755
      </p>

      <h2>{de ? "Umsatzsteuer-ID" : "VAT ID"}</h2>
      <p>
        {de
          ? "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:"
          : "VAT identification number according to § 27 a of the German VAT Act:"}
        <br />
        DE367593464
      </p>

      <h2>{de ? "Streitschlichtung" : "Dispute resolution"}</h2>
      <p>
        {de
          ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: "
          : "The European Commission provides a platform for online dispute resolution (ODR): "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
        .{" "}
        {de
          ? "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
          : "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."}
      </p>
    </LegalLayout>
  );
}
