import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "MINGZI - Find a Chinese name with meaning",
  description: "Thoughtful Chinese names shaped by sound, character, and cultural meaning.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"d29693c54fe14e2e9501be161500e650"}' strategy="afterInteractive" /></body></html>;
}
