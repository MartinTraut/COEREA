/**
 * Mock listing data for Phase 1 (design-faithful, no backend yet).
 * Copy, sizes and prices are taken verbatim from the CoArea Figma design.
 * Images are the design's own photography, extracted from the Figma exports.
 */
export type Host = {
  name: string
  age: number
  since: string
  ratingAvg: number
  reviews: number
}

export type Listing = {
  slug: string
  category: string
  title: string
  /** Real photo from the CoArea design, served from /public/images. */
  image: string
  excerpt: string
  city: string
  size: string
  price: { amount: string; unit: string }
  rating: number
  reviews: number
  badge?: "NEU" | "Beliebt"
  from?: string
  to?: string
  /** Free-form date note used when there is no clean from–to range. */
  dateText?: string
  host: Host
  tone: number // 0..5 → placeholder gradient variant
}

const roland: Host = {
  name: "Roland Schick",
  age: 64,
  since: "03.07.2022",
  ratingAvg: 4.8,
  reviews: 16,
}
const hans: Host = {
  name: "Hans Schüller",
  age: 58,
  since: "12.01.2022",
  ratingAvg: 4.9,
  reviews: 23,
}
const heike: Host = {
  name: "Heinrich Heike",
  age: 47,
  since: "21.05.2022",
  ratingAvg: 4.7,
  reviews: 9,
}

export const LISTINGS: Listing[] = [
  {
    slug: "parzelle-ackerflaeche-bornheim",
    image: "/images/listing-agrar-bornheim.jpg",
    category: "agrar-forst",
    title: "Parzelle auf einer Ackerfläche zur eigenen Nutzung, Bornheim",
    excerpt:
      "Unser Angebot umfasst eine großzügige Parzelle von 20 m² auf unserer Agrarfläche in Bornheim, die reich an fruchtbarer Erde und natürlichen Ressourcen ist. Die Fläche befindet sich inmitten einer idyllischen Landschaft mit sanften Hügeln, umgeben von saftig grünen Wiesen und einer atemberaubenden Aussicht.",
    city: "Bornheim",
    size: "20 m²",
    price: { amount: "2,50 €", unit: "Tag" },
    rating: 5,
    reviews: 10,
    badge: "NEU",
    from: "13.04.2023",
    to: "30.09.2023",
    host: roland,
    tone: 0,
  },
  {
    slug: "umzaeunte-weide-solingen",
    image: "/images/listing-weide-solingen.jpg",
    category: "agrar-forst",
    title: "Umzäunte Weide am Stadtrand / Ideal für Tierhaltung",
    excerpt:
      "Weitläufige, eingezäunte Weidefläche am Rand von Solingen — ideal für Tierhaltung, Beweidung und naturnahe Nutzung.",
    city: "Solingen Burg",
    size: "1,4 ha",
    price: { amount: "710 €", unit: "Monat" },
    rating: 5,
    reviews: 12,
    badge: "NEU",
    from: "01.01.2023",
    to: "31.12.2023",
    host: roland,
    tone: 0,
  },
  {
    slug: "parzelle-gewaechshaus-korschenbroich",
    image: "/images/listing-gewaechshaus.jpg",
    category: "private-gaerten",
    title: "Deine eigene Parzelle im Gewächshaus",
    excerpt:
      "Geschützte Parzelle in einem gepflegten Gewächshaus — perfekt zum Anbauen, Ernten und Gärtnern das ganze Jahr über.",
    city: "Korschenbroich",
    size: "85,5 m²",
    price: { amount: "179 €", unit: "Monat" },
    rating: 5,
    reviews: 9,
    badge: "Beliebt",
    from: "01.02.2023",
    to: "31.10.2023",
    host: heike,
    tone: 2,
  },
  {
    slug: "hinterhof-schreiner-koeln",
    image: "/images/listing-hinterhof-koeln.jpg",
    category: "gewerbe",
    title: "Hinterhof vom Schreiner: Ideal für einen Marktplatz",
    excerpt:
      "Charmanter, überdachter Innenhof einer Schreinerei — perfekt für Märkte, kleine Veranstaltungen und Pop-ups.",
    city: "Köln",
    size: "960 m²",
    price: { amount: "220 €", unit: "Tag" },
    rating: 5,
    reviews: 21,
    from: "01.02.2023",
    to: "31.11.2023",
    host: hans,
    tone: 3,
  },
  {
    slug: "volleyballfeld-koeln",
    image: "/images/listing-volleyball-koeln.jpg",
    category: "oeffentlicher-sport",
    title: "Volleyballfeld für Aktivitäten im Freien",
    excerpt:
      "Gepflegtes Feld für Turniere, Events und spontane Aktivitäten — stundenweise buchbar.",
    city: "Köln",
    size: "162 m²",
    price: { amount: "6 €", unit: "Stunde" },
    rating: 5,
    reviews: 7,
    from: "01.04.2023",
    to: "31.10.2023",
    host: heike,
    tone: 4,
  },
  {
    slug: "forstflaeche-frechen",
    image: "/images/listing-forstflaeche-frechen.jpg",
    category: "agrar-forst",
    title: "Forstfläche für Naturliebhaber und Waldbewirtschaftung",
    excerpt:
      "Ruhige, bewaldete Fläche ideal für Naturliebhaber, nachhaltige Waldbewirtschaftung und Erholung im Grünen.",
    city: "Frechen",
    size: "1231 m²",
    price: { amount: "30 €", unit: "Woche" },
    rating: 5,
    reviews: 8,
    dateText: "ab 01.04",
    host: heike,
    tone: 1,
  },
  {
    slug: "stellplatzanlage-koeln-deutz",
    image: "/images/listing-stellplatz-koeln-deutz.jpg",
    category: "gewerbe",
    title: "Stellplatzanlage eines Einkaufszentrums für große Events",
    excerpt:
      "Große, befestigte Stellplatzanlage — an Feiertagen und Sonntagen verfügbar für Märkte und Großveranstaltungen.",
    city: "Köln Deutz",
    size: "1,102 ha",
    price: { amount: "3000 €", unit: "Tag" },
    rating: 5,
    reviews: 5,
    dateText: "Feiertage & Sonntage",
    host: hans,
    tone: 3,
  },
  {
    slug: "skateanlage-dortmund",
    image: "/images/listing-skateanlage-dortmund.jpg",
    category: "oeffentlicher-sport",
    title: "Skate- & Freizeitanlage für private Events buchen",
    excerpt:
      "Voll ausgestattete Skate- und Freizeitanlage — ideal für private Events, Wettbewerbe und Community-Aktionen.",
    city: "Dortmund",
    size: "600 m²",
    price: { amount: "90 €", unit: "Tag" },
    rating: 5,
    reviews: 11,
    from: "01.04.2023",
    to: "31.10.2023",
    host: heike,
    tone: 4,
  },
  {
    slug: "sportflaeche-aachen",
    image: "/images/listing-sportflaeche-aachen.jpg",
    category: "oeffentlicher-sport",
    title: "Sportfläche für private Kurse",
    excerpt:
      "Flexible Sportfläche für Kurse, Training und Gruppenangebote — stundenweise buchbar.",
    city: "Aachen",
    size: "800 m²",
    price: { amount: "12 €", unit: "Stunde" },
    rating: 5,
    reviews: 6,
    from: "01.04.2023",
    to: "31.10.2023",
    host: roland,
    tone: 4,
  },
  {
    slug: "sportanlage-duesseldorf",
    image: "/images/listing-sportanlage-duesseldorf.jpg",
    category: "oeffentlicher-sport",
    title: "Vollausgestattete Sportanlage für private Sportevents",
    excerpt:
      "Professionell ausgestattete Sportanlage — ideal für Turniere, private Sportevents und Vereinsveranstaltungen.",
    city: "Düsseldorf",
    size: "1,8 ha",
    price: { amount: "1940 €", unit: "Tag" },
    rating: 5,
    reviews: 4,
    from: "01.04.2023",
    to: "31.10.2023",
    host: hans,
    tone: 4,
  },
  {
    slug: "gartenparzelle-singen",
    image: "/images/listing-gartenparzelle-singen.jpg",
    category: "private-gaerten",
    title: "Gartenparzelle am Hangweiher Quartier",
    excerpt:
      "Sonnige Gartenparzelle im ruhigen Hangweiher Quartier — bereit für dein eigenes Urban-Gardening-Projekt.",
    city: "Singen",
    size: "40 m²",
    price: { amount: "60 €", unit: "Monat" },
    rating: 5,
    reviews: 13,
    badge: "Beliebt",
    from: "01.02.2023",
    to: "31.10.2023",
    host: heike,
    tone: 2,
  },
  {
    slug: "blumengarten-st-augustin",
    image: "/images/listing-blumengarten-st-augustin.jpg",
    category: "private-gaerten",
    title: "Wunderschöner Blumengarten für Events oder Fotoshootings",
    excerpt:
      "Liebevoll angelegter Blumengarten — die perfekte Kulisse für Events, Feiern und Fotoshootings.",
    city: "St. Augustin",
    size: "1231 m²",
    price: { amount: "600 €", unit: "Tag" },
    rating: 5,
    reviews: 18,
    from: "01.05.2023",
    to: "31.08.2023",
    host: heike,
    tone: 2,
  },
  {
    slug: "gewerbeflaeche-solingen-mitte",
    image: "/images/listing-gewerbeflaeche-solingen.jpg",
    category: "gewerbe",
    title: "Ungenutzte Gewerbefläche als Lager- & Nutzfläche",
    excerpt:
      "Ebenerdige Gewerbefläche in zentraler Lage — vielseitig nutzbar als Lager-, Stell- oder Veranstaltungsfläche.",
    city: "Solingen Mitte",
    size: "450 m²",
    price: { amount: "499 €", unit: "Monat" },
    rating: 5,
    reviews: 5,
    from: "01.01.2023",
    to: "31.12.2023",
    host: hans,
    tone: 3,
  },
]

export const listingBySlug = (slug: string) =>
  LISTINGS.find((l) => l.slug === slug)

export const otherListingsByHost = (hostName: string, exceptSlug: string) =>
  LISTINGS.filter((l) => l.host.name === hostName && l.slug !== exceptSlug)
