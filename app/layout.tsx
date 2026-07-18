import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nameapp.uk"),
  title: "MINGZI - Find a Chinese name with meaning",
  description: "Thoughtful Chinese names shaped by sound, character, and cultural meaning.",
  keywords: ["Chinese name generator", "Chinese name", "learn Chinese", "Chinese culture", "Chinese surname"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "MINGZI — Find a Chinese name with meaning",
    description: "Create a thoughtful Chinese name, explore its sound and meaning, and save a shareable name card.",
    url: "/",
    siteName: "MINGZI",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MINGZI — Find a Chinese name with meaning",
    description: "Create a thoughtful Chinese name and save your shareable name card.",
  },
  verification: { google: "8LOfGaOI8t1sn2XG-wG6ML80cK4mTbViW-r5DfW6ba8" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "MINGZI", url: "https://nameapp.uk", description: "A cultural and linguistic Chinese name atelier." };
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><Script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"d29693c54fe14e2e9501be161500e650"}' strategy="afterInteractive" /></body></html>;
}
