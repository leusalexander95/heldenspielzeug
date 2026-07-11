import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], display: "swap" });
const baloo = Baloo_2({ variable: "--font-baloo", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://heldenspielzeug.de"),
  title: {
    default: "Heldenspielzeug – Nachhaltiges Spielzeug aus Heidelberg",
    template: "%s · Heldenspielzeug",
  },
  description:
    "Nachhaltiges Holzspielzeug und Bau-Sets für kleine Helden. Von Bäumen zu Spielzeug – fair, sicher und aus Liebe zum Spiel.",
  keywords: ["Holzspielzeug", "nachhaltiges Spielzeug", "PlanToys", "Bavvic", "Kinderspielzeug", "Heidelberg"],
  openGraph: {
    title: "Heldenspielzeug – Nachhaltiges Spielzeug aus Heidelberg",
    description: "Nachhaltiges Holzspielzeug und Bau-Sets für kleine Helden.",
    type: "website",
    locale: "de_DE",
    siteName: "Heldenspielzeug",
    images: [{ url: "/logo.png", width: 600, height: 224, alt: "Heldenspielzeug" }],
  },
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Heldenspielzeug GmbH",
  url: "https://heldenspielzeug.de",
  logo: "https://heldenspielzeug.de/logo.png",
  email: "leusalexander95@outlook.com",
  telephone: "+4915776227819",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Langer Anger 60",
    postalCode: "69115",
    addressLocality: "Heidelberg",
    addressCountry: "DE",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${nunito.variable} ${baloo.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-cream">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
