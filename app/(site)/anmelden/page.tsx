import type { Metadata } from "next"

import { TabHeading } from "@/components/brand/tab-heading"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Anmelden",
  description:
    "Melde Dich bei CoArea an oder registriere Dich, um Flächen zu buchen und anzubieten.",
  robots: { index: false, follow: true },
}

export default function AnmeldenPage() {
  return (
    /*
      The form used to float alone on a white page. Putting it on the lit cream
      band gives the card something to sit on, which is the whole reason a login
      screen reads as a place rather than as a leftover fragment.
    */
    <div className="mesh grain relative isolate flex justify-center overflow-hidden bg-cream py-[clamp(3rem,6vw,7rem)]">
      <div className="relative container-page flex justify-center">
        <div className="w-full max-w-md">
          <TabHeading as="h1" className="text-[clamp(1.5rem,1.4vw+0.9rem,2.25rem)]">
            Anmelden
          </TabHeading>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
