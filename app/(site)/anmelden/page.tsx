import type { Metadata } from "next"
import Link from "next/link"

import { TabHeading } from "@/components/brand/tab-heading"

export const metadata: Metadata = {
  title: "Anmelden",
  description: "Melde Dich bei CoArea an oder registriere Dich, um Flächen zu buchen und anzubieten.",
}

const inputCls =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"

export default function AnmeldenPage() {
  return (
    <div className="container-page flex justify-center py-16 md:py-24">
      <div className="w-full max-w-md">
        <TabHeading as="h1" className="text-2xl">
          Anmelden
        </TabHeading>

        <form className="mt-8 grid gap-4 rounded-xl border border-border bg-card p-7">
          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">E-Mail-Adresse</span>
            <input type="email" required autoComplete="email" className={inputCls} />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Passwort</span>
            <input type="password" required autoComplete="current-password" className={inputCls} />
          </label>
          <button
            type="submit"
            className="mt-1 rounded-md bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            weiter
          </button>
          <a href="#" className="text-center text-xs text-muted-foreground hover:text-teal">
            Passwort vergessen?
          </a>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Noch kein Konto?{" "}
          <Link href="/anmelden" className="font-semibold text-teal hover:underline">
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </div>
  )
}
