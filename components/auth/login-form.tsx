"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { useRouter } from "next/navigation"
import { Info } from "lucide-react"

/**
 * Sign-in form.
 *
 * The markup had no submit handler, so pressing "weiter" reloaded the page and
 * said nothing. There is no auth backend yet — pretending to sign someone in
 * would be the wrong fix, so this validates the input, says plainly that the
 * prototype has no accounts, and opens the host dashboard, which is the thing
 * behind the door.
 */
const inputCls =
  "w-full border border-input bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors hover:border-teal/50 focus-visible:border-teal focus-visible:outline-none"

export function LoginForm() {
  const router = useRouter()
  const mailId = useId()
  const passId = useId()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [touched, setTouched] = useState(false)

  const mailBad = touched && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  const passBad = touched && password.length < 6

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return
    if (password.length < 6) return
    router.push("/dashboard")
  }

  return (
    <>
      <form onSubmit={submit} noValidate className="surface mt-7 grid gap-4 p-7 shadow-[var(--shadow-lg)]">
        <div className="flex items-start gap-3 border-l-[3px] border-teal bg-teal-50 px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
          <p className="text-xs leading-relaxed text-ink">
            Prototyp ohne Konten: jede gültige Eingabe öffnet das Host-Dashboard.
          </p>
        </div>

        <label className="grid gap-1.5" htmlFor={mailId}>
          <span className="text-[13px] font-medium text-muted-foreground">
            E-Mail-Adresse
          </span>
          <input
            id={mailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={mailBad || undefined}
            aria-describedby={mailBad ? `${mailId}-err` : undefined}
            className={inputCls}
          />
          {mailBad ? (
            <span id={`${mailId}-err`} role="alert" className="field-error text-xs">
              Bitte gib eine gültige E-Mail-Adresse an.
            </span>
          ) : null}
        </label>

        <label className="grid gap-1.5" htmlFor={passId}>
          <span className="text-[13px] font-medium text-muted-foreground">Passwort</span>
          <input
            id={passId}
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={passBad || undefined}
            aria-describedby={passBad ? `${passId}-err` : undefined}
            className={inputCls}
          />
          {passBad ? (
            <span id={`${passId}-err`} role="alert" className="field-error text-xs">
              Mindestens 6 Zeichen.
            </span>
          ) : null}
        </label>

        <button
          type="submit"
          className="btn btn-teal sheen mt-1 px-5 py-3.5 text-sm"
        >
          weiter
        </button>

        {/* No reset flow exists yet — plain text beats a link that goes nowhere. */}
        <p className="text-center text-xs text-muted-foreground">
          Passwort vergessen? Melde Dich unter{" "}
          <a href="mailto:info@coarea.de" className="text-teal hover:underline">
            info@coarea.de
          </a>
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Noch kein Konto?{" "}
        <Link href="/host-werden" className="font-semibold text-teal hover:underline">
          Werde Host
        </Link>{" "}
        oder{" "}
        <Link href="/flaechen" className="font-semibold text-teal hover:underline">
          entdecke Flächen
        </Link>
      </p>
    </>
  )
}
