import type { Metadata } from "next"
import { Discover } from "@/components/listings/discover"

export const metadata: Metadata = {
  title: "Flächen entdecken",
  description:
    "Entdecke ungenutzte Flächen in Deiner Nähe — Gärten, Agrar- und Sportflächen, Gewerbe und mehr. Filtern, suchen und auf der Karte finden.",
}

export default function FlaechenPage() {
  return <Discover />
}
