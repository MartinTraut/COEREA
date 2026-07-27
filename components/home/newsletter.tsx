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
      A teal band, not a white one. This is the only pure conversion block on
      the page, and it sat between two quiet sections where a faint hatch on
      cream disappeared entirely. The white card floats on the brand colour with
      the Schraffur showing through around it; its elevation is a drop-shadow
      filter rather than box-shadow because clip-path would cut a shadow off.
    */
    /*
      The band uses the BRIGHT gradient, not the text-safe one: nothing sits on
      it directly — the heading, form and confirmation are all inside the white
      card — so there is no contrast requirement, and the lighter teal is what
      keeps this strip distinct from the deep-teal footer instead of merging
      into one continuous block of colour.
    */
    <section className="mesh mesh-dark grain relative isolate overflow-hidden [background:var(--grad-teal-bright)] py-[clamp(2.75rem,4vw,4.5rem)]">
      {/*
        The white card covers most of this band, so a full-height Schraffur only
        ever showed in a 2–4rem margin around it, where it read as fraying
        rather than as the brand's diagonal. It runs along the top edge and
        dissolves instead — the same treatment as the benefits band above, so
        the two teal bands announce themselves the same way.
      */}
      <span
        aria-hidden
        className="hatch-white absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black_0,black_14%,transparent_42%)]"
      />
      <div className="relative container-page">
        {/*
          `justify-between` on the full 1520px column pushed the heading and the
          form to opposite ends with ~480px of nothing between them — on the only
          pure conversion block of the page. The card is capped and the two parts
          sit next to each other with a real gap instead.
        */}
        <div className="notch notch-lg mx-auto flex max-w-[64rem] flex-col items-start gap-[clamp(1.5rem,3vw,3.5rem)] bg-white p-[clamp(1.5rem,2.6vw,3rem)] [filter:drop-shadow(0_26px_50px_rgba(0,60,56,0.32))] md:flex-row md:items-center">
        <TabHeading className="text-[clamp(1.15rem,1.5vw+0.5rem,1.75rem)]">
          Nichts mehr verpassen &amp; zum
          <br className="hidden sm:block" /> Newsletter anmelden!
        </TabHeading>

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
            <div className="flex items-stretch overflow-hidden rounded-[var(--radius-control)] border border-input transition-colors duration-200 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/25">
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
                className="min-w-0 flex-1 rounded-none border-0 bg-white px-4 py-3.5 text-sm text-ink-900 outline-none placeholder:text-ink/70 focus-visible:outline-none"
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
            <p className="mt-3 text-xs/[1.6] text-ink">
              Wir schreiben Dir nur zum CoArea-Newsletter und Du kannst jederzeit
              widersprechen. Wie wir mit Deinen Daten umgehen, steht in der{" "}
              <Link href="/datenschutz" className="underline underline-offset-2 hover:text-teal">
                Datenschutzerklärung
              </Link>
              .
            </p>
            {state === "invalid" ? (
              <p
                id={`${id}-err`}
                role="alert"
                className="field-error mt-2 text-xs"
              >
                Bitte gib eine gültige E-Mail-Adresse an.
              </p>
            ) : null}
          </form>
        )}
        </div>
      </div>
    </section>
  )
}
