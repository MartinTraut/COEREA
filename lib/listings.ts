/**
 * Listing data for Phase 1 (design-faithful, no backend yet).
 *
 * Titles, cities, sizes, prices and periods are read off the Figma category
 * frames ("Flächen entdecken" per category, six listings each); the photos are
 * cut from those same frames. Date strings are normalised to "… bis …" — the
 * exports mix "bis" and a hyphen for the same field.
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
  /** Shown as a filled teal heart, as on the agrar frame. */
  saved?: boolean
  from?: string
  to?: string
  /** Free-form date note used when there is no clean from–to range. */
  dateText?: string
  host: Host
  tone: number // 0..5 → fallback gradient variant when no photo is set
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

const SEASON = { from: "01.02.2023", to: "31.10.2023" }
const YEAR = { from: "01.01.2023", to: "31.12.2023" }
const SUMMER = { from: "01.04.2023", to: "31.10.2023" }

export const LISTINGS: Listing[] = [
  /* ---------- Innerstädtische private Gärten ---------- */
  {
    slug: "parzelle-gewaechshaus-korschenbroich",
    image: "/images/listing-parzelle-gewaechshaus-korschenbroich.jpg",
    category: "private-gaerten",
    title: "Deine eigene Parzelle im Gewächshaus",
    excerpt:
      "Geschützte Parzelle in einem gepflegten Gewächshaus, perfekt zum Anbauen, Ernten und Gärtnern das ganze Jahr über.",
    city: "Korschenbroich",
    size: "85,5 m²",
    price: { amount: "179 €", unit: "Monat" },
    rating: 5,
    reviews: 9,
    ...SEASON,
    host: heike,
    tone: 2,
  },
  {
    slug: "gartenparzelle-singen",
    image: "/images/listing-gartenparzelle-singen.jpg",
    category: "private-gaerten",
    title: "Gartenparzelle am Hangweiher Quartier",
    excerpt:
      "Sonnige Gartenparzelle im ruhigen Hangweiher Quartier, bereit für dein eigenes Urban-Gardening-Projekt.",
    city: "Singen",
    size: "40 m²",
    price: { amount: "60 €", unit: "Monat" },
    rating: 5,
    reviews: 13,
    ...SEASON,
    host: heike,
    tone: 2,
  },
  {
    slug: "fruchtbarer-boden-wuerselen",
    image: "/images/listing-fruchtbarer-boden-wuerselen.jpg",
    category: "private-gaerten",
    title: "Fruchtbarer Boden für eine ertragsreiche Ernte",
    excerpt:
      "Nährstoffreiche Gartenfläche mit lockerem Boden, ideal für Gemüsebeete und eine ertragsreiche eigene Ernte.",
    city: "Würselen",
    size: "145 m²",
    price: { amount: "100 €", unit: "Monat" },
    rating: 5,
    reviews: 7,
    ...SEASON,
    host: heike,
    tone: 2,
  },
  {
    slug: "hobby-garten-essen",
    image: "/images/listing-hobby-garten-essen.jpg",
    category: "private-gaerten",
    title: "Dein kleiner Hobby-Garten am Stadtwald",
    excerpt:
      "Kompaktes Hochbeet am Stadtwald: der unkomplizierte Einstieg ins eigene Gärtnern, mitten in der Stadt.",
    city: "Essen",
    size: "5 m²",
    price: { amount: "25 €", unit: "Monat" },
    rating: 5,
    reviews: 11,
    ...SEASON,
    host: heike,
    tone: 2,
  },
  {
    slug: "blumengarten-st-augustin",
    image: "/images/listing-blumengarten-st-augustin.jpg",
    category: "private-gaerten",
    title: "Wunderschöner Blumengarten für Events oder Fotoshootings",
    excerpt:
      "Liebevoll angelegter Blumengarten: die perfekte Kulisse für Events, Feiern und Fotoshootings.",
    city: "St. Augustin",
    size: "1800 m²",
    price: { amount: "600 €", unit: "Tag" },
    rating: 5,
    reviews: 18,
    from: "01.05.2023",
    to: "31.08.2023",
    host: heike,
    tone: 2,
  },
  {
    slug: "blumenboden-wermelskirchen",
    image: "/images/listing-blumenboden-wermelskirchen.jpg",
    category: "private-gaerten",
    title: "Dein eigener Bereich auf fruchtbarem Blumenboden",
    excerpt:
      "Abgegrenzter Bereich in einem gepflegten Blumengarten, für eigene Pflanzungen und ruhige Stunden im Grünen.",
    city: "Wermelskirchen",
    size: "20 m²",
    price: { amount: "45 €", unit: "Monat" },
    rating: 5,
    reviews: 6,
    from: "01.03.2023",
    to: "31.10.2023",
    host: heike,
    tone: 2,
  },

  /* ---------- Agrar- & Forstflächen ---------- */
  {
    slug: "areal-leichlingen",
    image: "/images/listing-areal-leichlingen.jpg",
    category: "agrar-forst",
    title: "Riesiges umzäuntes Areal für landwirtschaftliche Zwecke",
    excerpt:
      "Weitläufiges, vollständig umzäuntes Areal, ausgelegt für landwirtschaftliche Nutzung im großen Maßstab.",
    city: "Leichlingen",
    size: "4,1 ha",
    price: { amount: "2100 €", unit: "Monat" },
    rating: 5,
    reviews: 14,
    ...YEAR,
    host: roland,
    tone: 0,
  },
  {
    slug: "weide-dabringhausen",
    image: "/images/listing-weide-dabringhausen.jpg",
    category: "agrar-forst",
    title: "Freie Weide für landwirtschaftliche Zwecke",
    excerpt:
      "Offene, saftig grüne Weidefläche, bereit für Beweidung, Tierhaltung und landwirtschaftliche Nutzung.",
    city: "Dabringhausen",
    size: "2,1 ha",
    price: { amount: "790 €", unit: "Monat" },
    rating: 5,
    reviews: 9,
    saved: true,
    ...SEASON,
    host: roland,
    tone: 0,
  },
  {
    slug: "gelaende-langenfeld",
    image: "/images/listing-gelaende-langenfeld.jpg",
    category: "agrar-forst",
    title: "Umzäuntes Gelände zur Eigennutzung",
    excerpt:
      "Eingezäuntes Gelände zur freien Eigennutzung, vielseitig einsetzbar und jederzeit gut erreichbar.",
    city: "Langenfeld",
    size: "0,5 ha",
    price: { amount: "1600 €", unit: "Monat" },
    rating: 5,
    reviews: 8,
    ...YEAR,
    host: roland,
    tone: 0,
  },
  {
    slug: "weideflaeche-bonn",
    image: "/images/listing-weideflaeche-bonn.jpg",
    category: "agrar-forst",
    title: "Freie Weidefläche zur Eigennutzung / Events genehmigungspflichtig",
    excerpt:
      "Große freie Weidefläche zur Eigennutzung. Veranstaltungen sind nach Absprache und Genehmigung möglich.",
    city: "Bonn",
    size: "3,34 ha",
    price: { amount: "135 €", unit: "Woche" },
    rating: 5,
    reviews: 5,
    ...YEAR,
    host: roland,
    tone: 0,
  },
  {
    slug: "umzaeunte-weide-solingen",
    image: "/images/listing-umzaeunte-weide-solingen.jpg",
    category: "agrar-forst",
    title: "Umzäunte Weide am Stadtrand / Ideal für Tierhaltung",
    excerpt:
      "Weitläufige, eingezäunte Weidefläche am Rand von Solingen, ideal für Tierhaltung, Beweidung und naturnahe Nutzung.",
    city: "Solingen Burg",
    size: "1,4 ha",
    price: { amount: "710 €", unit: "Monat" },
    rating: 5,
    reviews: 12,
    ...YEAR,
    host: roland,
    tone: 0,
  },
  {
    slug: "forstflaeche-monheim",
    image: "/images/listing-forstflaeche-monheim.jpg",
    category: "agrar-forst",
    title: "Private Forstfläche direkt am Rhein/ ideal für den Campingurlaub",
    excerpt:
      "Private Forstfläche in Rheinnähe, ruhig gelegen und wie gemacht für Camping und Erholung in der Natur.",
    city: "Monheim",
    size: "1200 m²",
    price: { amount: "200 €", unit: "Woche" },
    rating: 5,
    reviews: 7,
    ...YEAR,
    host: roland,
    tone: 1,
  },

  /* ---------- Öffentliche Sport- & Freizeitflächen ---------- */
  {
    slug: "volleyballfeld-koeln",
    image: "/images/listing-volleyballfeld-koeln.jpg",
    category: "oeffentlicher-sport",
    title: "Volleyballfeld für Aktivitäten im Freien",
    excerpt:
      "Gepflegtes Feld für Turniere, Events und spontane Aktivitäten, stundenweise buchbar.",
    city: "Köln",
    size: "162 m²",
    price: { amount: "6 €", unit: "Stunde" },
    rating: 5,
    reviews: 7,
    ...SUMMER,
    host: heike,
    tone: 4,
  },
  {
    slug: "sportflaeche-aachen",
    image: "/images/listing-sportflaeche-aachen.jpg",
    category: "oeffentlicher-sport",
    title: "Sportfläche für private Kurse",
    excerpt:
      "Flexible Sportfläche für Kurse, Training und Gruppenangebote, stundenweise buchbar.",
    city: "Aachen",
    size: "500 m²",
    price: { amount: "12 €", unit: "Stunde" },
    rating: 5,
    reviews: 6,
    ...SUMMER,
    host: roland,
    tone: 4,
  },
  {
    slug: "multifunktionsrasen-dueren",
    image: "/images/listing-multifunktionsrasen-dueren.jpg",
    category: "oeffentlicher-sport",
    title: "Multifunktionsrasen für große Veranstaltungen",
    excerpt:
      "Großer, ebener Rasenplatz: die Bühne für Turniere, Festivals und Veranstaltungen jeder Größe.",
    city: "Düren",
    size: "1,2 ha",
    price: { amount: "380 €", unit: "Tag" },
    rating: 5,
    reviews: 9,
    from: "01.07.2023",
    to: "31.08.2023",
    host: heike,
    tone: 4,
  },
  {
    slug: "sportanlage-duesseldorf",
    image: "/images/listing-sportanlage-duesseldorf.jpg",
    category: "oeffentlicher-sport",
    title: "Vollausgestattete Sportanlage für private Sportevents",
    excerpt:
      "Professionell ausgestattete Sportanlage, ideal für Turniere, private Sportevents und Vereinsveranstaltungen.",
    city: "Düsseldorf",
    size: "1,8 ha",
    price: { amount: "1940 €", unit: "Tag" },
    rating: 5,
    reviews: 4,
    ...SUMMER,
    host: hans,
    tone: 4,
  },
  {
    slug: "skateanlage-dortmund",
    image: "/images/listing-skateanlage-dortmund.jpg",
    category: "oeffentlicher-sport",
    title: "Skate- & Freizeitanlage für private Events buchen",
    excerpt:
      "Voll ausgestattete Skate- und Freizeitanlage, ideal für private Events, Wettbewerbe und Community-Aktionen.",
    city: "Dortmund",
    size: "600 m²",
    price: { amount: "90 €", unit: "Tag" },
    rating: 5,
    reviews: 11,
    ...SUMMER,
    host: heike,
    tone: 4,
  },
  {
    slug: "freizeitflaeche-moenchengladbach",
    image: "/images/listing-freizeitflaeche-moenchengladbach.jpg",
    category: "oeffentlicher-sport",
    title: "Versiegelte Freizeitfläche für private Kurse",
    excerpt:
      "Befestigte, wetterfeste Freizeitfläche, zuverlässig nutzbar für Kurse, Training und Gruppenangebote.",
    city: "Mönchengladbach",
    size: "800 m²",
    price: { amount: "20 €", unit: "Stunde" },
    rating: 5,
    reviews: 5,
    ...SUMMER,
    host: heike,
    tone: 4,
  },

  /* ---------- Gewerbliche Flächen ---------- */
  {
    slug: "bueroparkplatz-neuss",
    image: "/images/listing-bueroparkplatz-neuss.jpg",
    category: "gewerbe",
    title: "Innerstädtischer Büroparkplatz für große Events",
    excerpt:
      "Zentraler Büroparkplatz, der außerhalb der Betriebszeiten frei wird, viel Platz für große Veranstaltungen.",
    city: "Neuss",
    size: "0,34 ha",
    price: { amount: "550 €", unit: "Tag" },
    rating: 5,
    reviews: 12,
    dateText: "Feiertage und Wochenenden",
    host: hans,
    tone: 3,
  },
  {
    slug: "innenhof-metalverarbeitung-dormagen",
    image: "/images/listing-innenhof-metalverarbeitung-dormagen.jpg",
    category: "gewerbe",
    title: "Innenhof einer Metalverarbeitung für Partys und Events",
    excerpt:
      "Charaktervoller Innenhof eines Metallbetriebs, an Wochenenden frei für Partys, Feiern und Events.",
    city: "Dormagen",
    size: "750 m²",
    price: { amount: "90 €", unit: "Tag" },
    rating: 5,
    reviews: 8,
    dateText: "Feiertage und Wochenenden",
    host: hans,
    tone: 3,
  },
  {
    slug: "innenhof-tech-koeln-deutz",
    image: "/images/listing-innenhof-tech-koeln-deutz.jpg",
    category: "gewerbe",
    title: "Exklusiver Innenhof eines Tech-Unternehmens für besondere Veranstaltungen",
    excerpt:
      "Repräsentativer Innenhof eines Tech-Unternehmens: der passende Rahmen für besondere Veranstaltungen.",
    city: "Köln Deutz",
    size: "1100 m²",
    price: { amount: "600 €", unit: "Tag" },
    rating: 5,
    reviews: 10,
    dateText: "Feiertage und Wochenenden",
    host: hans,
    tone: 3,
  },
  {
    slug: "gewerbeflaeche-solingen-mitte",
    image: "/images/listing-gewerbeflaeche-solingen-mitte.jpg",
    category: "gewerbe",
    title: "Ungenutzte Gewerbefläche als Lager-& Nutzfläche",
    excerpt:
      "Ebenerdige Gewerbefläche in zentraler Lage, vielseitig nutzbar als Lager-, Stell- oder Veranstaltungsfläche.",
    city: "Solingen Mitte",
    size: "450 m²",
    price: { amount: "499 €", unit: "Monat" },
    rating: 5,
    reviews: 5,
    ...YEAR,
    host: hans,
    tone: 3,
  },
  {
    slug: "lagerflaeche-wuppertal",
    image: "/images/listing-lagerflaeche-wuppertal.jpg",
    category: "gewerbe",
    title: "Gesicherte und überwachte Lagerfläche in der Innenstadt",
    excerpt:
      "Videoüberwachte, gesicherte Lagerfläche mitten in der Stadt, kurzfristig und flexibel buchbar.",
    city: "Wuppertal",
    size: "1200 m²",
    price: { amount: "500 €", unit: "Woche" },
    rating: 5,
    reviews: 6,
    dateText: "Feiertage und Wochenenden",
    host: hans,
    tone: 3,
  },
  {
    slug: "stellplatzanlage-koeln-deutz",
    image: "/images/listing-stellplatzanlage-koeln-deutz.jpg",
    category: "gewerbe",
    title: "Stellplatzanlage eines Einkaufszentrums für große Veranstaltungen",
    excerpt:
      "Große, befestigte Stellplatzanlage, an Feiertagen und Sonntagen verfügbar für Märkte und Großveranstaltungen.",
    city: "Köln Deutz",
    size: "1,102 ha",
    price: { amount: "3000 €", unit: "Tag" },
    rating: 5,
    reviews: 5,
    dateText: "Feiertage und Sonntage",
    host: hans,
    tone: 3,
  },

  /* ---------- Weitere Flächen aus den Home-Frames ---------- */
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
    slug: "hinterhof-schreiner-koeln",
    image: "/images/listing-hinterhof-koeln.jpg",
    category: "gewerbe",
    title: "Hinterhof vom Schreiner: Ideal für einen Marktplatz",
    excerpt:
      "Charmanter, überdachter Innenhof einer Schreinerei, perfekt für Märkte, kleine Veranstaltungen und Pop-ups.",
    city: "Köln",
    size: "960 m²",
    price: { amount: "220 €", unit: "Tag" },
    rating: 5,
    reviews: 21,
    ...YEAR,
    host: hans,
    tone: 3,
  },
]

export const listingBySlug = (slug: string) =>
  LISTINGS.find((l) => l.slug === slug)

/**
 * Areas that start out marked as saved, as the design shows them. The wishlist
 * seeds itself with these on the visitor's first save, so marking one area does
 * not silently unmark the others.
 */
export const DEFAULT_SAVED_SLUGS = LISTINGS.filter((l) => l.saved).map((l) => l.slug)

export const listingsByCategory = (category: string) =>
  LISTINGS.filter((l) => l.category === category)

export const otherListingsByHost = (hostName: string, exceptSlug: string) =>
  LISTINGS.filter((l) => l.host.name === hostName && l.slug !== exceptSlug)

/** "31.10.2023" → a comparable number 20231031, or null if unparsable. */
function dayNumber(german: string): number | null {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(german.trim())
  return m ? Number(`${m[3]}${m[2]}${m[1]}`) : null
}

/** "2023-10-31" (the value of an `<input type="date">`) → 20231031. */
function isoDayNumber(iso: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
  return m ? Number(`${m[1]}${m[2]}${m[3]}`) : null
}

/**
 * Is this area open on the given day?
 *
 * The hero's date field used to be sent to /flaechen as `?ab=` and then
 * silently ignored, so the URL claimed a filter the results never applied.
 * Areas carry a real `from`–`to` window, so the question can be answered for
 * them; the ones described only in prose (`dateText`, e.g. "Feiertage und
 * Wochenenden") cannot be decided from the data, so they are kept rather than
 * hidden — dropping an area because we cannot read its calendar would be the
 * more damaging error.
 */
export function availableOn(listing: Listing, iso: string): boolean {
  const day = isoDayNumber(iso)
  if (day === null) return true

  const from = listing.from ? dayNumber(listing.from) : null
  const to = listing.to ? dayNumber(listing.to) : null
  if (from === null && to === null) return true

  if (from !== null && day < from) return false
  if (to !== null && day > to) return false
  return true
}

/** "2023-10-31" → "31.10.2023", for labelling the active filter. */
export function formatIsoDay(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso
}
