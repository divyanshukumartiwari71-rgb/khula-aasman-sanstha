import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Khula Aasman Sanstha | Registered NGO in Varanasi",
    template: "%s | Khula Aasman Sanstha"
  },
  description: "Khula Aasman Sanstha is a registered non-profit organization (NGO) in Varanasi, India, working for Child Education, Women Empowerment, nutrition, and rural development.",
  keywords: ["NGO Varanasi", "Khula Aasman Sanstha", "Varanasi NGO", "Child Education India", "Women Empowerment Varanasi", "Charity Varanasi"],
  openGraph: {
    title: "Khula Aasman Sanstha | NGO Varanasi",
    description: "Uplifting communities in Varanasi through Child Education, Women Empowerment, and Rural Development.",
    url: "https://khulaaasmansanstha.org",
    siteName: "Khula Aasman Sanstha",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

