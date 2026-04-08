import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/layout/PageTransition";
import MotionProvider from "@/components/layout/MotionProvider";

// Only load weights that are actually used in the design system
const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"], // extrabold=800, bold=700, semibold=600
  variable: "--font-syne",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"], // body=400, medium=500
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false, // non-critical — eyebrows/tags, lazy ok
  fallback: ["monospace"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#080C14" },
    { media: "(prefers-color-scheme: dark)", color: "#080C14" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tecsteer.com"
  ),
  title: {
    template: "%s | Tecsteer",
    default: "Tecsteer — IT Services & Solutions",
  },
  description:
    "Tecsteer offers innovative IT services including consulting, Salesforce solutions, application development, and cloud-based technology to empower businesses worldwide.",
  openGraph: {
    siteName: "Tecsteer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] bg-accent-primary text-white px-4 py-2 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
