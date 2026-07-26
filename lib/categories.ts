import {
  AgrarForstIcon,
  GewerbeIcon,
  GruenanlagenIcon,
  OeffentlichePlaetzeIcon,
  OeffentlicherSportIcon,
  PrivateGaertenIcon,
  PrivatePlaetzeIcon,
  PrivaterSportIcon,
} from "@/components/brand/category-icons"

/**
 * Category icons are the brand's own drawn marks, not a generic icon set —
 * they carry the CoArea Schraffur and are recoloured through `currentColor`.
 */
export type CategoryIcon = (props: { className?: string }) => React.JSX.Element

export type Category = {
  slug: string
  label: string
  short: string
  /** Typical usage phrase shown on detail/booking screens (branchengerecht). */
  usage: string
  icon: CategoryIcon
  /**
   * The three private categories sit on a Schraffur diamond in every frame —
   * a fixed property of the category, not a selected state.
   */
  hatchedPlate?: boolean
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
    icon: PrivateGaertenIcon,
    hatchedPlate: true,
  },
  {
    slug: "agrar-forst",
    label: "Agrar- & Forstflächen",
    short: "Agrar & Forst",
    usage: "landwirtschaftliche Nutzung",
    icon: AgrarForstIcon,
  },
  {
    slug: "oeffentlicher-sport",
    label: "Öffentl. Sport- & Freizeitflächen",
    short: "Öffentl. Sport",
    usage: "Sport & Freizeit",
    icon: OeffentlicherSportIcon,
  },
  {
    slug: "privater-sport",
    label: "Private Sport- & Freizeitflächen",
    short: "Privater Sport",
    usage: "Sport & Freizeit",
    icon: PrivaterSportIcon,
    hatchedPlate: true,
  },
  {
    slug: "gewerbe",
    label: "Gewerbliche Flächen",
    short: "Gewerbe",
    usage: "gewerbliche Nutzung",
    icon: GewerbeIcon,
  },
  {
    slug: "private-plaetze",
    label: "Innerstädtische private Plätze",
    short: "Private Plätze",
    usage: "private Veranstaltungen",
    icon: PrivatePlaetzeIcon,
    hatchedPlate: true,
  },
  {
    slug: "oeffentliche-plaetze",
    label: "Innerstädtische öffentl. Plätze",
    short: "Öffentl. Plätze",
    usage: "öffentliche Veranstaltungen",
    icon: OeffentlichePlaetzeIcon,
  },
  {
    slug: "gruenanlagen",
    label: "Innerstädtische öffentl. Grünanlagen",
    short: "Grünanlagen",
    usage: "Erholung & Freizeit",
    icon: GruenanlagenIcon,
  },
]

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)

/**
 * The options offered in the booking widget's "Art der Nutzung" select.
 *
 * This list used to be typed out again inside `booking-widget.tsx`, wrapped in a
 * pointless `Array.from(new Set(...))` and not exported — so if a category's
 * `usage` were edited here, the widget could preselect a value with no matching
 * `<option>` (the browser then shows option 1 while the state says something
 * else), and `/buchen` had no way to validate `?nutzung=` at all. Derived from
 * the categories, plus the extras that are not tied to one category.
 */
export const USAGE_OPTIONS: readonly string[] = [
  ...new Set([
    ...CATEGORIES.map((c) => c.usage),
    "Lagerung & Stellfläche",
    "Sonstiges",
  ]),
]
