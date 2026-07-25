"use client"

import { useState } from "react"
import { Send, Check } from "lucide-react"

const inputCls =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"

export function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-teal/30 bg-accent p-8">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-white">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-semibold text-ink">Danke für deine Nachricht!</h3>
        <p className="text-sm text-muted-foreground">
          Wir melden uns so schnell wie möglich bei dir zurück.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="rounded-xl border border-border bg-card p-6 md:p-8"
    >
      <p className="mb-5 text-sm font-medium text-ink">
        Lass uns wissen, wie wir Dir helfen können!
      </p>
      <div className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Vor- &amp; Nachname *
          </span>
          <input required className={inputCls} autoComplete="name" />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            E-Mail-Adresse *
          </span>
          <input required type="email" className={inputCls} autoComplete="email" />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Deine Nachricht *
          </span>
          <textarea required rows={4} className={inputCls} />
        </label>
        <button
          type="submit"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
        >
          <Send className="h-4 w-4" />
          senden
        </button>
        <p className="text-xs text-muted-foreground">* Pflichtfeld</p>
      </div>
    </form>
  )
}
