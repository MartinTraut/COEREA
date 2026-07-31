"use client"

import { useEffect, useRef, useState } from "react"
import { Send, Mail } from "lucide-react"

import { SITE } from "@/lib/site"

/*
  Contact form.

  There is no backend yet, so the form composes a prefilled mail and hands it to
  the visitor's mail client. That is the honest option: the previous version
  swallowed the input and showed a "thanks, we'll be in touch" confirmation for
  a message that was never sent anywhere.

  When an API route exists, replace `handleSubmit` with the fetch and keep the
  markup — the field names already match a normal contact payload.
*/
const inputCls =
  "w-full border border-input bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-[border-color,box-shadow] duration-200 hover:border-teal/50 focus:border-teal focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--teal)_14%,transparent)] focus-visible:outline-none"
const labelCls = "text-[13px] font-semibold text-ink-900"

export function ContactForm() {
  const [handedOff, setHandedOff] = useState(false)
  const [mailHref, setMailHref] = useState("")
  const doneRef = useRef<HTMLDivElement>(null)

  /*
    The form is replaced outright, so the focused submit button ceases to exist
    and focus drops to `<body>`: the next Tab starts again at the site header,
    and nothing announces that the page has changed. Moving focus to the
    confirmation keeps the visitor where the instructions are — and those
    instructions matter here, because handing off to a mail client is the one
    step that can quietly fail.
  */
  useEffect(() => {
    if (handedOff) doneRef.current?.focus()
  }, [handedOff])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const message = String(data.get("message") ?? "")

    const href =
      `mailto:${SITE.contact.email}` +
      `?subject=${encodeURIComponent(`Anfrage über coarea.de: ${name}`)}` +
      `&body=${encodeURIComponent(`${message}\n\nViele Grüße\n${name}\n${email}`)}`

    setMailHref(href)
    setHandedOff(true)
    window.location.href = href
  }

  if (handedOff) {
    return (
      <div
        ref={doneRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col items-start gap-3 rounded-[var(--radius)] border border-teal/60 bg-accent p-8 outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        {/*
          Shared plate. This was the only `rounded-full` icon container on the
          homepage, sitting a few centimetres from three 12px-cornered ones in
          the same section — it read as an accident rather than as a decision.
          Full rounds are reserved for avatars, where the shape means "person".
        */}
        <span className="icon-plate icon-plate-solid">
          <Mail strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="text-lg font-semibold text-ink">
          Dein E-Mail-Programm sollte sich geöffnet haben.
        </h3>
        <p className="text-[15px] leading-relaxed text-ink">
          Schick die vorbereitete Nachricht einfach ab, dann liegt sie direkt in
          unserem Postfach. Ist nichts passiert, schreib uns bitte direkt an{" "}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="text-teal underline underline-offset-2"
          >
            {SITE.contact.email}
          </a>
          .
        </p>
        <a
          href={mailHref}
          className="btn btn-outline mt-2 min-h-11 px-5"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Nachricht erneut öffnen
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="notch notch-lg border border-border bg-white p-6 md:p-8"
    >
      <p className="text-[clamp(1.0625rem,0.45vw+0.9rem,1.375rem)] font-semibold text-ink-900">
        Lass uns wissen, wie wir Dir helfen können!
      </p>
      <p className="mt-2 mb-6 text-[14px] leading-relaxed text-ink">
        Drei Felder. Mehr brauchen wir nicht, um Dir zu antworten.
      </p>
      <div className="grid gap-4">
        <label className="grid gap-1.5">
          <span className={labelCls}>Vor- &amp; Nachname *</span>
          <input name="name" required className={inputCls} autoComplete="name" />
        </label>
        <label className="grid gap-1.5">
          <span className={labelCls}>E-Mail-Adresse *</span>
          <input
            name="email"
            required
            type="email"
            className={inputCls}
            autoComplete="email"
          />
        </label>
        <label className="grid gap-1.5">
          <span className={labelCls}>Deine Nachricht *</span>
          <textarea name="message" required rows={4} className={inputCls} />
        </label>
        <button
          type="submit"
          className="btn btn-teal sheen min-h-12 w-fit px-6"
        >
          <Send className="h-4 w-4" aria-hidden />
          senden
        </button>
        <p className="text-[13px] text-ink">
          * Pflichtfeld · Die Nachricht wird über Dein E-Mail-Programm an{" "}
          {SITE.contact.email} gesendet.
        </p>
      </div>
    </form>
  )
}
