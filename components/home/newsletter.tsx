"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { Check, Send } from "lucide-react"

import { TabHeading } from "@/components/brand/tab-heading"

/**
 * Newsletter sign-up.
 *
 * The form had no handler, so pressing "jetzt anmelden" reloaded the page and
 * dropped the address without a word. There is no list to subscribe to yet, so
 * this confirms what actually happened — the address is held on this device —
 * rather than implying a subscription that does not exist.
 */
const STORE_KEY = "coarea:newsletter"

export function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "invalid" | "done">("idle")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("invalid")
      return
    }
    try {
      window.localStorage.setItem(STORE_KEY, email.trim())
    } catch {
      // Storage blocked — the confirmation below is still accurate enough.
    }
    setState("done")
  }

  return (
    /*
      Not a band any more — an object.

      It used to be a full-width teal strip with its own Schraffur, and on
      /ueber-uns it landed between the teal CTA band and the deep-teal footer:
      three hatched teal blocks in a row (client, 2026-07-28: „zu viele Linien,
      im Footer ist gut"). A strip cannot solve that, however it is coloured,
      because the problem is that three consecutive sections all claim the same
      full-bleed treatment.

      So the colour moves inside: a deep-teal card on the quiet cream ground.
      The block still reads as the one conversion moment on the page — it is the
      darkest thing in view — but it has edges, it sits in the page grid with
      the footer below it, and the Schraffur is now the footer's alone.

      Elevation is a drop-shadow filter on the wrapper rather than a box-shadow,
      because the notch is a clip-path and clip-path cuts a box-shadow off.
    */
    <section className="relative bg-cream py-[clamp(2.5rem,4vw,4.5rem)]">
      <div className="container-page">
        <div className="[filter:drop-shadow(0_24px_44px_rgba(0,60,56,0.22))]">
        <div className="mesh mesh-dark grain notch notch-lg relative isolate flex flex-col items-start gap-[clamp(1.5rem,3vw,3.5rem)] overflow-hidden [background:var(--grad-teal-deep)] p-[clamp(1.5rem,2.8vw,3.25rem)] text-white md:flex-row md:items-center">
        <div className="md:w-[min(24rem,40%)]">
        {/* No manual line break: the column is narrower than the old full-width
            card, so a hard break landed mid-phrase („Nichts mehr / verpassen &
            zum"). `text-balance` distributes the three lines evenly instead. */}
        <TabHeading
          variant="white"
          className="text-[clamp(1.15rem,1.5vw+0.5rem,1.75rem)] text-balance"
        >
          Nichts mehr verpassen &amp; zum Newsletter anmelden!
        </TabHeading>
        {/* Says what arrives, before the address is asked for. */}
        <p className="mt-4 text-[0.9375rem]/[1.6] text-white/80">
          Neue Flächen, Nachbarschaftsprojekte und was CoArea als Nächstes baut.
        </p>
        </div>

        {state === "done" ? (
          <div
            role="status"
            className="flex w-full items-start gap-3 rounded-[var(--radius-control)] border border-teal/25 border-l-[3px] border-l-teal bg-teal-50 px-5 py-4 md:flex-1"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
            {/*
              „Sobald der Newsletter startet, melden wir uns bei Dir" was the one
              promise on the site that nobody could keep: the address never
              leaves this browser, so no one will ever write to it. The rest of
              the prototype says what it is; this said the opposite.
            */}
            <p className="text-sm text-ink">
              <span className="font-semibold text-teal">Notiert, vorerst nur auf
              diesem Gerät.</span>{" "}
              Der CoArea-Newsletter ist noch nicht gestartet. Deine Adresse wird
              nicht übertragen, sondern nur lokal in Deinem Browser vorgemerkt.
            </p>
          </div>
        ) : (
          /* `md:w-auto` let the control shrink to its content and left ~180px
             of the card empty beside it. It takes the remaining width. */
          <form onSubmit={submit} noValidate className="w-full md:flex-1">
            {/*
              Field and action share one outline and sit flush, so the pair
              reads as a single control rather than as two adjacent boxes.

              That intent survived the radius retrofit badly. The global input
              rule gives every field `--radius-control` on all four corners and
              `.btn` rounds the button the same way, so at the seam two 12px
              arcs curved away from each other and left a white wedge above and
              below — an hourglass pinch. It looked like the two were jammed
              together, which is what "die Buttons kleben sehr eng aneinander"
              is describing; the cause is geometry, not spacing.

              The radius now lives on the wrapper, which clips both children,
              and the children are square. One shape, one focus state.
            */}
            {/* On the dark card the neutral input border disappeared, so the
                pair carries a white outline and a white focus ring. */}
            <div className="flex items-stretch overflow-hidden rounded-[var(--radius-control)] border border-white/30 bg-white transition-colors duration-200 focus-within:border-white focus-within:ring-2 focus-within:ring-white/40">
              <input
                id={id}
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state === "invalid") setState("idle")
                }}
                placeholder="E-Mail-Adresse eingeben"
                aria-label="E-Mail-Adresse"
                aria-invalid={state === "invalid" || undefined}
                aria-describedby={state === "invalid" ? `${id}-err` : undefined}
                /* Square: the wrapper owns the corners. `outline-none` is safe
                   here only because the wrapper carries a visible focus ring. */
                className="min-w-0 flex-1 rounded-none border-0 bg-white px-4 py-3.5 text-sm text-ink-900 outline-none placeholder:text-ink focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="Zum Newsletter anmelden"
                className="btn btn-teal sheen shrink-0 rounded-none px-5 text-sm"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">jetzt anmelden</span>
              </button>
            </div>

            {/* Collecting an address without naming the purpose and without a
                route to the privacy notice is the one thing this form must not
                do once a backend is behind it. */}
            <p className="mt-3 text-xs/[1.6] text-white/75">
              Wir schreiben Dir nur zum CoArea-Newsletter und Du kannst jederzeit
              widersprechen. Wie wir mit Deinen Daten umgehen, steht in der{" "}
              <Link href="/datenschutz" className="underline underline-offset-2 hover:text-white">
                Datenschutzerklärung
              </Link>
              .
            </p>
            {state === "invalid" ? (
              /* `.field-error` is the destructive red, which on deep teal drops
                 to around 2:1. The brand gold carries the same alarm at a
                 contrast a reader can actually resolve. */
              <p
                id={`${id}-err`}
                role="alert"
                className="mt-2 text-xs font-medium text-[var(--gold)]"
              >
                Bitte gib eine gültige E-Mail-Adresse an.
              </p>
            ) : null}
          </form>
        )}
        </div>
        </div>
      </div>
    </section>
  )
}
