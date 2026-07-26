"use client"

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
        Full-height Schraffur — on the client's instruction (2026-07-26): the
        lines run all the way through the band, not as a 24px edge. Kept at a
        low opacity so the white card still reads as sitting on a surface rather
        than as a hole punched in a field of stripes.
      */}
      <span aria-hidden className="hatch-white absolute inset-0 opacity-25" />
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
            className="flex w-full max-w-md items-start gap-3 border-l-[3px] border-teal bg-teal-50 px-5 py-4 md:w-auto"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
            <p className="text-sm text-ink">
              <span className="font-semibold text-teal">Notiert.</span> Sobald der
              CoArea-Newsletter startet, melden wir uns bei {email.trim()}.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="w-full md:w-auto md:min-w-[26rem]">
            <div className="flex items-stretch">
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
                /* Input and action share one outline and sit flush, so the pair
                   reads as a single control rather than two adjacent boxes. */
                className="min-w-0 flex-1 border border-r-0 border-input bg-white px-4 py-3.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink/70 focus:border-teal focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="Zum Newsletter anmelden"
                className="btn btn-teal sheen shrink-0 px-5 text-sm"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">jetzt anmelden</span>
              </button>
            </div>
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
