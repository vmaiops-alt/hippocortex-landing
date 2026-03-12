import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Hippocortex — Memory for AI Agents",
  description:
    "Deterministic memory layer that captures what your agents do, compiles patterns into reusable knowledge, and synthesizes context within token budgets.",
  openGraph: {
    title: "Hippocortex — AI Agents That Learn From Experience",
    description:
      "Three API calls. Zero LLM dependencies. Full provenance on every fact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-bg-base text-text-secondary font-sans">
        {children}
      </body>
    </html>
  );
}
