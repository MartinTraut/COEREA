"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQ = [
  {
    q: "Wie und wann bezahle ich?",
    a: "Die Zahlung erfolgt sicher über CoArea, sobald der Host Deine Buchungsanfrage bestätigt hat. Du zahlst bequem online — nicht direkt an den Host.",
  },
  {
    q: "Welche Zahlungsart wird akzeptiert?",
    a: "Wir akzeptieren gängige Zahlungsmethoden wie Kreditkarte, SEPA-Lastschrift und PayPal. Weitere Optionen folgen laufend.",
  },
  {
    q: "Kann ich dort parken?",
    a: "Ob Parkmöglichkeiten vorhanden sind, findest Du in der jeweiligen Flächenbeschreibung oder Du fragst den Host direkt über die Chat-Funktion.",
  },
  {
    q: "Wie kann ich eine Fläche langfristig buchen?",
    a: "Für langfristige Nutzungen wähle einfach einen entsprechend langen Zeitraum oder sprich den Host für individuelle Konditionen direkt an.",
  },
  {
    q: "Kann ich eine Buchung stornieren?",
    a: "Ja. Die Stornobedingungen richten sich nach der jeweiligen Fläche und sind vor der Buchung transparent einsehbar.",
  },
  {
    q: "Was passiert bei Beschädigungen der Fläche oder des Mobiliars?",
    a: "Schäden werden fair zwischen Nutzer und Host geregelt. CoArea unterstützt bei der Klärung und Kommunikation.",
  },
  {
    q: "Kann ich die gemietete Fläche mit weiteren Mitmenschen nutzen?",
    a: "Ja. Wie viele Personen die Fläche gemeinsam nutzen dürfen, legt der Host in der Flächenbeschreibung fest. Bei Fragen sprich ihn einfach direkt über die Chat-Funktion an.",
  },
]

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {FAQ.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.q}
            className="h-fit overflow-hidden border border-border bg-card"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-ink"
            >
              {item.q}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-teal transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
