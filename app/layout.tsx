import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

/*
  Brand font is Gotham Light/Medium (licensed). Montserrat is the free geometric
  stand-in for Phase 1 — swap for the licensed Gotham webfont when available.
*/
const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coarea.de"),
  title: {
    default: "CoArea — Gemeinsam nutzen, nachhaltig erleben.",
    template: "%s · CoArea",
  },
  description:
    "CoArea ist die Plattform, um ungenutzte Freiflächen gemeinschaftlich zu nutzen und zu teilen — Gärten, Sport- und Agrarflächen, Gewerbe und mehr. Gemeinsam nutzen, nachhaltig erleben.",
  keywords: [
    "Fläche mieten",
    "Freiflächen teilen",
    "Garten mieten",
    "Agrarfläche mieten",
    "nachhaltige Flächennutzung",
    "CoArea",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "CoArea",
    title: "CoArea — Gemeinsam nutzen, nachhaltig erleben.",
    description:
      "Die Plattform für die gemeinschaftliche Nutzung ungenutzter Freiflächen.",
    url: "https://www.coarea.de",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning className={cn(sans.variable)}>
      <body className="min-h-svh font-sans antialiased">{children}</body>
    </html>
  )
}
