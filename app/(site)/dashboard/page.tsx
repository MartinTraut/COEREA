import type { Metadata } from "next"

import { AccountNav } from "@/components/dashboard/account-nav"
import { WelcomePanel } from "@/components/dashboard/welcome-panel"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import {
  ContactPerson,
  HostReviews,
  InsertCta,
  ListedAreas,
  PotenzialBand,
} from "@/components/dashboard/host-sections"

export const metadata: Metadata = {
  title: "Dein Dashboard",
  description:
    "Deine inserierten Flächen, Einnahmen, Buchungsanfragen und Bewertungen auf einen Blick.",
  robots: { index: false, follow: false },
}

export default function DashboardPage() {
  return (
    <>
      <AccountNav />
      <WelcomePanel />
      <DashboardCharts />
      <PotenzialBand />
      <ListedAreas />
      <ContactPerson />
      <InsertCta />
      <HostReviews />
    </>
  )
}
