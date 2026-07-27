import type { Metadata } from "next"
import { CalendarCheck, MapPinned, ShieldCheck } from "lucide-react"

import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Anmelden",
  description:
    "Melde Dich bei CoArea an oder registriere Dich, um Flächen zu buchen und anzubieten.",
  robots: { index: false, follow: true },
}

/*
  What the account is for. Three lines, each one a thing the prototype actually
  does — a login screen that promises features which do not exist is the fastest
  way to lose the trust it is supposed to build.
*/
const POINTS = [
  {
    icon: MapPinned,
    title: "Flächen in Deiner Nähe",
    text: "Gemerkte Flächen und Suchen bleiben erhalten, auf jedem Gerät.",
  },
  {
    icon: CalendarCheck,
    title: "Anfragen an einem Ort",
    text: "Zeitraum, Status und Kontaktdaten zu jeder Anfrage im Überblick.",
  },
  {
    icon: ShieldCheck,
    title: "Du entscheidest",
    text: "Als Host nimmst Du jede Anfrage einzeln an oder lehnst sie ab.",
  },
]

export default function AnmeldenPage() {
  return (
    /*
      The form used to sit alone in the middle of a cream page: a card with two
      fields and nothing to hold it. A sign-in is the first screen where a
      marketplace is either credible or not, so it gets a proper composition —
      the brand panel argues why an account is worth having, the form does its
      job beside it. Below `lg` the panel folds away entirely; on a phone the
      only thing anybody wants here is the two fields.
    */
    <div className="mesh grain relative isolate overflow-hidden bg-cream py-[clamp(2.5rem,5vw,6rem)]">
      <div className="relative container-page">
        <div className="notch notch-lg mx-auto grid max-w-[64rem] overflow-hidden bg-white [filter:drop-shadow(0_30px_60px_rgba(0,101,95,0.16))] lg:grid-cols-[1.05fr_1fr]">
          {/* Brand panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-teal p-[clamp(2rem,3vw,3.25rem)] text-white lg:flex">
            {/*
              The hatch marks private ground everywhere else on the site, so it
              runs out after the top ninth here rather than tiling the panel —
              enough to place the brand, not so much that the motif stops
              meaning anything.
            */}
            <span
              aria-hidden
              className="hatch-white absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black_0,black_11%,transparent_38%)]"
            />

            <div className="relative">
              <span className="eyebrow eyebrow-invert">Dein CoArea-Konto</span>
              <h1 className="mt-5 text-[clamp(1.6rem,1.7vw+1rem,2.375rem)]/[1.15] font-semibold text-balance">
                Fläche teilen, statt sie liegen zu lassen.
              </h1>
              <p className="mt-5 max-w-[26rem] text-[0.9375rem]/[1.7] text-white/85">
                Ein Konto für beide Seiten: Du suchst eine Fläche, Du bietest
                eine an, oder beides.
              </p>
            </div>

            <ul className="relative mt-[clamp(2.5rem,4vw,4rem)] grid gap-6">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="icon-plate icon-plate-sm icon-plate-invert">
                    <p.icon strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-semibold">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[0.875rem]/[1.6] text-white/75">
                      {p.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form panel */}
          <div className="p-[clamp(1.5rem,2.6vw,3rem)]">
            {/*
              The `h1` lives in the brand panel on a desktop, which is hidden
              below `lg` — so this one carries the heading on small screens and
              steps down to a label above it. Exactly one `h1` per viewport.
            */}
            <h1 className="text-[clamp(1.5rem,1.4vw+0.9rem,1.875rem)]/[1.2] font-semibold text-ink-900 lg:hidden">
              Willkommen bei CoArea
            </h1>
            <p className="mt-2 text-sm text-muted-foreground lg:hidden">
              Melde Dich an oder erstelle in einer Minute ein Konto.
            </p>
            <div className="mt-6 lg:mt-0">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
