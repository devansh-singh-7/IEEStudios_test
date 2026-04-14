import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import ClientLayout from "@/components/ui/ClientLayout";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "IEE Studios — Exclusive Launch Films for Tech & SaaS",
  description: "Exclusive Launch Films for Tech & SaaS",
  openGraph: {
    title: "IEE Studios",
    description: "Exclusive Launch Films for Tech & SaaS",
    url: "https://ieestudios.com", // Replace with real URL
    siteName: "IEE Studios",
    images: [
      {
        url: "/og-image.jpg", // Replace with real OG image path
        width: 1200,
        height: 630,
        alt: "IEE Studios - Launch Films",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IEE Studios",
    description: "Exclusive Launch Films for Tech & SaaS",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
