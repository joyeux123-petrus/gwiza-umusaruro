import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBusinessInfo } from "@/lib/business";

export const metadata: Metadata = {
  title: "Gwiza Umusaruro Agroveto | Agriculture & Veterinary",
  description: "Helping Farmers and Livestock Keepers Grow Their Productivity in Rwanda.",
};

const locales = ['rw', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const businessInfo = await getBusinessInfo();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer businessInfo={businessInfo} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
