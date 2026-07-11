"use client";

import LegalLayout from "@/components/LegalLayout";
import { useLang } from "@/context/LanguageContext";

export default function DatenschutzPage() {
  const { locale } = useLang();
  const de = locale === "de";

  if (de) {
    return (
      <LegalLayout title="Datenschutzerklärung">
        <p>
          Wir freuen uns über Ihr Interesse an unserem Onlineshop. Der Schutz Ihrer personenbezogenen Daten ist uns ein
          wichtiges Anliegen. Nachfolgend informieren wir Sie ausführlich über den Umgang mit Ihren Daten gemäß der
          Datenschutz-Grundverordnung (DSGVO).
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Heldenspielzeug GmbH, Langer Anger 60, 69115 Heidelberg, Deutschland<br />
          E-Mail: <a href="mailto:leusalexander95@outlook.com">leusalexander95@outlook.com</a>, Telefon: +49 1577 6227819
        </p>

        <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>
          Wenn Sie eine Anfrage über unser Kontakt- oder Bestellformular senden, verarbeiten wir die von Ihnen
          angegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Nachricht), um Ihre Anfrage zu bearbeiten und mit
          Ihnen in Kontakt zu treten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
        </p>

        <h2>3. Weitergabe von Daten</h2>
        <p>
          Eine Übermittlung Ihrer Daten an Dritte erfolgt nur, soweit dies zur Vertragsabwicklung erforderlich ist
          (z. B. an Versanddienstleister oder Zahlungsdienstleister) oder wir gesetzlich dazu verpflichtet sind.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Unsere Website verwendet technisch notwendige Cookies sowie – nach Ihrer Einwilligung – Cookies zur
          Verbesserung des Nutzererlebnisses. Sie können Ihre Einwilligung jederzeit über den Cookie-Hinweis anpassen.
        </p>

        <h2>5. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
          sowie Widerspruch. Zudem steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
        </p>

        <h2>6. Speicherdauer</h2>
        <p>
          Wir speichern Ihre Daten nur so lange, wie dies für die genannten Zwecke erforderlich ist oder gesetzliche
          Aufbewahrungsfristen dies vorschreiben.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Thank you for your interest in our online shop. Protecting your personal data is important to us. Below we inform
        you about how we handle your data in accordance with the General Data Protection Regulation (GDPR).
      </p>

      <h2>1. Controller</h2>
      <p>
        Heldenspielzeug GmbH, Langer Anger 60, 69115 Heidelberg, Germany<br />
        Email: <a href="mailto:leusalexander95@outlook.com">leusalexander95@outlook.com</a>, Phone: +49 1577 6227819
      </p>

      <h2>2. Collection and storage of personal data</h2>
      <p>
        When you send an enquiry via our contact or order form, we process the data you provide (name, email address,
        phone number, message) in order to handle your request and get in touch with you. The legal basis is Art. 6 (1)
        (b) GDPR (pre-contractual measures).
      </p>

      <h2>3. Sharing of data</h2>
      <p>
        Your data is only shared with third parties where necessary to fulfil the contract (e.g. with shipping or
        payment service providers) or where we are legally obliged to do so.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Our website uses technically necessary cookies and – subject to your consent – cookies to improve the user
        experience. You can adjust your consent at any time via the cookie notice.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You have the right to access, rectification, erasure, restriction of processing, data portability and objection.
        You also have the right to lodge a complaint with a supervisory authority.
      </p>

      <h2>6. Retention period</h2>
      <p>
        We store your data only for as long as necessary for the stated purposes or as required by statutory retention
        periods.
      </p>
    </LegalLayout>
  );
}
