import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
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
  metadataBase: new URL("https://khulaaasmansanstha.com"),

  title: {
    default: "Khula Aasman Sanstha | Registered NGO in Varanasi",
    template: "%s | Khula Aasman Sanstha",
  },

  description:
    "Khula Aasman Sanstha is a registered non-profit organization (NGO) in Varanasi, India, working for Child Education, Women Empowerment, Nutrition Support and Rural Development.",

  keywords: [
    "Khula Aasman Sanstha",
    "NGO Varanasi",
    "Child Education",
    "Women Empowerment",
    "Rural Development",
    "Nutrition Support",
    "NGO India",
  ],

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Khula Aasman Sanstha | NGO Varanasi",
    description:
      "Empowering communities through education, women empowerment and rural development.",
    url: "https://khulaaasmansanstha.com",
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
      <body className="min-h-full">
        <Navbar />

        {children}

        <Footer />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
            },
          }}
        />
      </body>
    </html>
  );
}