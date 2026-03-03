import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Mehmet Salih Ozdinc | Creative Services",
  description:
    "Motion design, e-commerce visuals, brand identity & AI workflows — crafted with care.",
  openGraph: {
    title: "Mehmet Salih Ozdinc",
    description:
      "Motion design, e-commerce visuals, brand identity & AI workflows — crafted with care.",
    type: "website",
    locale: "en_US",
    siteName: "MSO Works",
  },
  twitter: {
    card: "summary",
    title: "Mehmet Salih Ozdinc",
    description:
      "Motion design, e-commerce visuals, brand identity & AI workflows — crafted with care.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <Grain />
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
