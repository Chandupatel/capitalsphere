import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { ConsultationModalProvider } from "@/components/consultation/ConsultationModalProvider";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";
import "./globals.css";

// Self-hosted variable fonts (OFL-licensed Inter & Playfair Display).
// Using next/font/local instead of next/font/google keeps builds
// reproducible in network-restricted CI/deploy environments.
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const playfair = localFont({
  src: "./fonts/playfair-display-latin-wght-normal.woff2",
  variable: "--font-playfair",
  display: "swap",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: "CapitalSphere | Legal, Financial & Government Funding Solutions",
  description:
    "CapitalSphere helps entrepreneurs launch, grow and scale their businesses with company registration, tax & compliance, government funding and business consulting services — PAN India.",
  keywords: [
    "company registration",
    "government funding",
    "MSME loans",
    "GST registration",
    "startup india",
    "business compliance",
  ],
  openGraph: {
    title: "CapitalSphere | Funding Today, Building Tomorrow",
    description:
      "Empowering businesses with smart legal & financial solutions — from company registration to government funding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ConsultationModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
          <ConsultationModal />
        </ConsultationModalProvider>
      </body>
    </html>
  );
}
