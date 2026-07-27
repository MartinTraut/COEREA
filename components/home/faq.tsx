import Link from "next/link"
import { ArrowRight, MessageCircleQuestion } from "lucide-react"

import { HOME_FAQ } from "@/lib/home-faq"
import { Reveal } from "@/components/brand/reveal"
import { FaqAccordion } from "@/components/listings/faq-accordion"

/*
  The homepage FAQ.

  Written interview-style — the questions are phrased the way somebody would
  actually type them, and every answer leads with the answer before the detail
  follows. That is what makes them usable as a featured snippet and as the
  passage an AI assistant quotes when somebody asks it what CoArea is.

  The same array feeds the FAQPage markup emitted by the page, so the two can
  never drift apart: Google only honours FAQ structured data whose content is
  visible on the page.

  Laid out as a rail plus a single column rather than as a two-column grid. The
  answers here run four to six lines, and in a two-column grid every row is as
  tall as its tallest cell — so opening one question tore a hole the size of the
  answer into the column beside it. One column also means the questions read in
  the order they were written, which is the order somebody actually asks them.
*/
export function Faq() {
  return (
    <section id="faq" className="container-page py-[clamp(2.75rem,3.6vw,4.25rem)]">
      <div className="grid gap-x-[clamp(2rem,4vw,5rem)] gap-y-[clamp(2rem,3vw,3rem)] lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start">
        {/* The rail stays alongside the questions while they are read — on a
            long list, a heading that has scrolled away stops orienting. */}
        <Reveal className="lg:sticky lg:top-28">
          <span className="eyebrow">Häufige Fragen</span>
          <h2 className="h-plain mt-4">Alles, was Du wissen willst</h2>
          <p className="mt-6 text-[0.9375rem]/[1.7] text-ink">
            Die Fragen, die uns am häufigsten gestellt werden — zur Plattform,
            zu Kosten, zum Ablauf einer Buchung und zu dem, was Du als
            Eigentümer in der Hand behältst.
          </p>

          {/* Closing hand-off — someone whose question is not in the list
              should not have to go looking for the way out of this section. */}
          <div className="mt-8 border-l-[3px] border-teal bg-teal-50 px-5 py-4">
            <p className="flex items-start gap-3 text-sm/[1.65] text-ink">
              <MessageCircleQuestion
                className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                aria-hidden
              />
              Deine Frage ist nicht dabei? Schreib uns — wir antworten
              persönlich, nicht mit einem Textbaustein.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/kontakt"
                className="arrow-nudge inline-flex items-center gap-2 text-sm font-semibold text-teal"
              >
                Frage stellen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hilfe"
                className="arrow-nudge inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-teal"
              >
                Zum Hilfebereich
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <FaqAccordion items={HOME_FAQ} columns={1} />
        </Reveal>
      </div>
    </section>
  )
}
