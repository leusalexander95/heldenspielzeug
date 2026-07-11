"use client";

import LegalLayout from "@/components/LegalLayout";
import { useLang } from "@/context/LanguageContext";

export default function WiderrufPage() {
  const { locale } = useLang();
  const de = locale === "de";

  if (de) {
    return (
      <LegalLayout title="Widerrufsbelehrung">
        <h2>Widerrufsrecht</h2>
        <p>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die
          Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht
          der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Heldenspielzeug GmbH, Langer Anger 60, 69115 Heidelberg,
          E-Mail: <a href="mailto:leusalexander95@outlook.com">leusalexander95@outlook.com</a>) mittels einer
          eindeutigen Erklärung (z. B. per Post oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
          informieren.
        </p>

        <h2>Folgen des Widerrufs</h2>
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
          einschließlich der Lieferkosten, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen,
          an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
        </p>
        <p>
          Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen etwaigen Wertverlust der
          Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und
          Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Right of Withdrawal">
      <h2>Right of withdrawal</h2>
      <p>
        You have the right to withdraw from this contract within fourteen days without giving any reason. The
        withdrawal period is fourteen days from the day on which you or a third party named by you, who is not the
        carrier, took possession of the goods.
      </p>
      <p>
        To exercise your right of withdrawal, you must inform us (Heldenspielzeug GmbH, Langer Anger 60, 69115
        Heidelberg, email: <a href="mailto:leusalexander95@outlook.com">leusalexander95@outlook.com</a>) by means of a
        clear statement (e.g. by post or email) of your decision to withdraw from this contract.
      </p>

      <h2>Consequences of withdrawal</h2>
      <p>
        If you withdraw from this contract, we will reimburse all payments received from you, including delivery costs,
        without undue delay and no later than fourteen days from the day on which we receive notification of your
        withdrawal.
      </p>
      <p>
        You bear the direct cost of returning the goods. You only have to pay for any diminished value of the goods if
        this is due to handling other than what is necessary to establish the nature, characteristics and functioning of
        the goods.
      </p>
    </LegalLayout>
  );
}
