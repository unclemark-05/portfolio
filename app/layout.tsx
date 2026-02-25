import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ClientCursor from "@/components/ui/ClientCursor";
import Preloader from "@/components/ui/Preloader";

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
    default: "Mosope Salami | Full-Stack Developer",
    template: "%s | Mosope Salami",
  },
  description:
    "Full-Stack Developer specializing in Next.js, React, and interactive web experiences. Building web applications that solve real problems.",
  openGraph: {
    title: "Mosope Salami | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Next.js, React, and interactive web experiences.",
    url: "https://portfolio-sage-alpha-44.vercel.app",
    siteName: "Mosope Salami Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mosope Salami | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Next.js, React, and interactive web experiences.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Preloader />
          <ClientCursor />
          <SmoothScrollProvider>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
