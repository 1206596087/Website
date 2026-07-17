import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MÍNGZI — Find a Chinese name with meaning",
  description: "Thoughtful Chinese names shaped by sound, character, and cultural meaning.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
