import {
  Flower2,
  Wheat,
  Trophy,
  Dumbbell,
  Warehouse,
  LandPlot,
  Building2,
  Trees,
  type LucideIcon,
} from "lucide-react"

export type Category = {
  slug: string
  label: string
  short: string
  /** Typical usage phrase shown on detail/booking screens (branchengerecht). */
  usage: string
  icon: LucideIcon
}

/**
 * The eight filter categories of the CoArea marketplace
 * (grouped into four macro-themes in the brochure scenarios).
 */
export const CATEGORIES: Category[] = [
  {
    slug: "private-gaerten",
    label: "Innerstädtische private Gärten",
    short: "Private Gärten",
    usage: "Urban Gardening",
    icon: Flower2,
  },
  {
    slug: "agrar-forst",
    label: "Agrar- & Forstflächen",
    short: "Agrar & Forst",
    usage: "landwirtschaftliche Nutzung",
    icon: Wheat,
  },
  {
    slug: "oeffentlicher-sport",
    label: "Öffentl. Sport- & Freizeitflächen",
    short: "Öffentl. Sport",
    usage: "Sport & Freizeit",
    icon: Trophy,
  },
  {
    slug: "privater-sport",
    label: "Private Sport- & Freizeitflächen",
    short: "Privater Sport",
    usage: "Sport & Freizeit",
    icon: Dumbbell,
  },
  {
    slug: "gewerbe",
    label: "Gewerbliche Flächen",
    short: "Gewerbe",
    usage: "gewerbliche Nutzung",
    icon: Warehouse,
  },
  {
    slug: "private-plaetze",
    label: "Innerstädtische private Plätze",
    short: "Private Plätze",
    usage: "private Veranstaltungen",
    icon: LandPlot,
  },
  {
    slug: "oeffentliche-plaetze",
    label: "Innerstädtische öffentl. Plätze",
    short: "Öffentl. Plätze",
    usage: "öffentliche Veranstaltungen",
    icon: Building2,
  },
  {
    slug: "gruenanlagen",
    label: "Innerstädtische öffentl. Grünanlagen",
    short: "Grünanlagen",
    usage: "Erholung & Freizeit",
    icon: Trees,
  },
]

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)
