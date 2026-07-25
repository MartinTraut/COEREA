import { Layers, Leaf, TrendingUp, HeartHandshake } from "lucide-react"
import { TabHeading } from "@/components/brand/tab-heading"

const BENEFITS = [
  {
    icon: Layers,
    title: "Nutzung des gesamten Flächenpotenzials",
    text: "Ungenutzte Flächen werden sichtbar, buchbar und sinnvoll ausgelastet.",
  },
  {
    icon: Leaf,
    title: "Nachhaltige Einflussnahme auf unsere Natur",
    text: "Teilen statt versiegeln — wir bewahren Böden und wertvolle Lebensräume.",
  },
  {
    icon: TrendingUp,
    title: "Steigerung der Lebensqualität in unseren Städten",
    text: "Neue grüne Orte der Begegnung und Erholung, mitten im urbanen Raum.",
  },
  {
    icon: HeartHandshake,
    title: "Mehr soziale Interaktion und Zusammenhalt",
    text: "Menschen verbinden sich, teilen Ressourcen und wachsen als Gemeinschaft.",
  },
]

export function Benefits() {
  return (
    <section className="bg-teal text-white">
      <div className="container-page py-16 md:py-20">
        <TabHeading variant="white" className="text-[clamp(1.4rem,2vw+0.5rem,2rem)]">
          Deine Vorteile mit CoArea
        </TabHeading>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col items-center gap-3 text-center">
              <b.icon className="h-9 w-9 text-white" strokeWidth={1.5} />
              <h3 className="text-base leading-snug font-semibold">{b.title}</h3>
              <p className="text-sm leading-relaxed text-white/80">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
