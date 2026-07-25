import { Send } from "lucide-react"
import { TabHeading } from "@/components/brand/tab-heading"

export function Newsletter() {
  return (
    <section className="hatch relative overflow-hidden py-12 md:py-16">
      <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <TabHeading className="bg-cream text-[clamp(1.15rem,1.5vw+0.5rem,1.6rem)]">
          Nichts mehr verpassen &amp; zum
          <br className="hidden sm:block" /> Newsletter anmelden!
        </TabHeading>

        <form className="flex w-full max-w-md items-center gap-2 md:w-auto">
          <input
            type="email"
            required
            placeholder="E-Mail-Adresse eingeben"
            aria-label="E-Mail-Adresse"
            className="min-w-0 flex-1 border border-border bg-white px-4 py-3 text-sm text-ink outline-none focus:border-teal focus-visible:ring-2 focus-visible:ring-teal/40"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-2 bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">jetzt anmelden</span>
          </button>
        </form>
      </div>
    </section>
  )
}
