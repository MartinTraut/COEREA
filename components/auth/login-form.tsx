"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Info, PlayCircle } from "lucide-react"

import { DEMO_HOST, nameFromEmail, signIn, signOut, useDemoSession } from "@/lib/demo-session"

/**
 * Sign-in and registration.
 *
 * There is no auth backend, so nothing here can actually create or verify an
 * account — but the screen is designed as the real thing, because a login is
 * the first place a marketplace either looks trustworthy or does not. Both
 * modes validate their input properly, report their own errors, and end in the
 * host dashboard, which is what is behind this door in the prototype. One
 * discreet line says so; everything else behaves as it would with a backend.
 */
const inputCls =
  "w-full rounded-[var(--radius-control)] border border-input bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors hover:border-teal/50 focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/20 focus-visible:outline-none"

const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Mode = "login" | "register"

export function LoginForm() {
  const router = useRouter()
  const user = useDemoSession()
  const mailId = useId()
  const passId = useId()
  const nameId = useId()

  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [terms, setTerms] = useState(false)
  const [stayed, setStayed] = useState(true)
  const [touched, setTouched] = useState(false)

  const isRegister = mode === "register"
  const nameBad = touched && isRegister && name.trim().length < 2
  const mailBad = touched && !MAIL.test(email.trim())
  const passBad = touched && password.length < (isRegister ? 8 : 6)
  const termsBad = touched && isRegister && !terms

  /*
    Already signed in?

    This page did not ask. A host who was signed in and pressed „Fläche
    inserieren" in his own dashboard was shown „Willkommen bei CoArea — melde
    Dich an", which reads as a session that has expired. Now it says who is
    signed in and offers the two things that make sense from here.
  */
  if (user) {
    return (
      <div className="grid gap-5">
        <div>
          <span className="caps text-teal">Angemeldet</span>
          <p className="mt-3 text-[clamp(1.125rem,0.6vw+0.95rem,1.375rem)]/[1.3] font-semibold text-ink-900">
            Du bist als {user.name} angemeldet.
          </p>
          <p className="mt-2 text-sm text-ink">{user.email}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard" className="btn btn-teal sheen min-h-12 px-6 text-sm">
            zum Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="btn btn-outline min-h-12 px-6 text-sm"
          >
            Konto wechseln
          </button>
        </div>
      </div>
    )
  }

  /*
    Signing in for real, as far as a prototype can: the session is written
    before the navigation, so the header, the account bar and the dashboard
    greeting are already in the signed-in state when the next page paints.
  */
  function enter(user: { name: string; email: string }) {
    signIn({ ...user, role: "host" }, stayed)
    router.push("/dashboard")
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (isRegister && name.trim().length < 2) return
    if (!MAIL.test(email.trim())) return
    if (password.length < (isRegister ? 8 : 6)) return
    if (isRegister && !terms) return
    const trimmed = email.trim()
    enter({
      name: isRegister ? name.trim() : nameFromEmail(trimmed),
      email: trimmed,
    })
  }

  /* Switching mode clears the error state — the fields are not the same set,
     so leaving „touched" on would flag a registration field the visitor has
     not seen yet. */
  function switchTo(next: Mode) {
    setMode(next)
    setTouched(false)
  }

  return (
    <div className="w-full">
      {/*
        Two modes in one surface, not two pages. Registering is the more
        valuable of the two actions and it is one click away, visible from the
        moment the screen loads, rather than hidden in a sentence underneath.
      */}
      <div
        role="tablist"
        aria-label="Anmelden oder registrieren"
        className="relative grid grid-cols-2 rounded-[var(--radius-control)] bg-cream p-1 text-sm font-semibold"
      >
        {(
          [
            ["login", "Anmelden"],
            ["register", "Konto erstellen"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => switchTo(value)}
            className={`rounded-[calc(var(--radius-control)-0.2rem)] px-4 py-2.5 transition-colors duration-300 ${
              mode === value
                ? "bg-white text-teal shadow-[var(--shadow-sm)]"
                : "text-muted-foreground hover:text-ink-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} noValidate className="mt-6 grid gap-4">
        {isRegister ? (
          <label className="grid gap-1.5" htmlFor={nameId}>
            <span className="text-[13px] font-medium text-muted-foreground">
              Vor- und Nachname
            </span>
            <input
              id={nameId}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={nameBad || undefined}
              aria-describedby={nameBad ? `${nameId}-err` : undefined}
              className={inputCls}
            />
            {nameBad ? (
              <span id={`${nameId}-err`} role="alert" className="field-error text-xs">
                Bitte gib Deinen Namen an.
              </span>
            ) : null}
          </label>
        ) : null}

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
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] font-medium text-muted-foreground">
              Passwort
            </span>
            {!isRegister ? (
              /* No reset flow exists, so this is the address that answers. */
              <a
                href="mailto:info@coarea.de?subject=Passwort%20zur%C3%BCcksetzen"
                className="text-xs font-medium text-teal hover:underline"
              >
                Passwort vergessen?
              </a>
            ) : null}
          </span>
          {/*
            The toggle sits inside the field rather than beside it, and the
            input carries padding for it, so the button can never overlap a
            long password.
          */}
          <span className="relative block">
            <input
              id={passId}
              name="password"
              type={show ? "text" : "password"}
              required
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={passBad || undefined}
              aria-describedby={passBad ? `${passId}-err` : undefined}
              className={`${inputCls} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Passwort verbergen" : "Passwort anzeigen"}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-[var(--radius-control)] text-muted-foreground transition-colors hover:text-teal"
            >
              {show ? (
                <EyeOff className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.75} />
              ) : (
                <Eye className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.75} />
              )}
            </button>
          </span>
          {passBad ? (
            <span id={`${passId}-err`} role="alert" className="field-error text-xs">
              {isRegister ? "Mindestens 8 Zeichen." : "Mindestens 6 Zeichen."}
            </span>
          ) : null}
        </label>

        {isRegister ? (
          <label className="flex items-start gap-3 text-xs leading-relaxed text-ink">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              aria-invalid={termsBad || undefined}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--teal)]"
            />
            <span>
              {/*
                A privacy notice is information under Art. 13 GDPR, not a
                document anybody agrees to — „ich akzeptiere die
                Datenschutzerklärung" produces no valid consent and mixes an
                information duty up with contract terms. Taken note of, not
                accepted.

                TODO: before this goes live it needs terms of use / AGB to
                agree to; only pages that exist are linked here.
              */}
              Ich habe die{" "}
              <Link
                href="/datenschutz"
                className="font-medium text-teal hover:underline"
              >
                Datenschutzerklärung
              </Link>{" "}
              zur Kenntnis genommen und akzeptiere den{" "}
              <Link
                href="/haftungsausschluss"
                className="font-medium text-teal hover:underline"
              >
                Haftungsausschluss
              </Link>
              .
              {termsBad ? (
                <span role="alert" className="field-error mt-1 block">
                  Ohne Zustimmung können wir kein Konto anlegen.
                </span>
              ) : null}
            </span>
          </label>
        ) : (
          /*
            „Angemeldet bleiben" was a checkbox with no name, no state and no
            handler, ticked by default and wired to nothing — the one control on
            the site that pretended to do something without saying it was a
            mock-up. It is real now: unticked, the session lives in
            sessionStorage and ends with the tab.
          */
          <label className="flex items-center gap-3 text-xs text-ink">
            <input
              type="checkbox"
              checked={stayed}
              onChange={(e) => setStayed(e.target.checked)}
              className="h-4 w-4 shrink-0 accent-[var(--teal)]"
            />
            Angemeldet bleiben
          </label>
        )}

        <button type="submit" className="btn btn-teal sheen group mt-1 h-12 px-5 text-sm">
          {isRegister ? "Konto erstellen" : "anmelden"}
          <span className="arrow-nudge inline-flex">
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        oder
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-3">
        {/* Both providers sign in the same demo host: there is no OAuth here,
            and a button that silently does nothing would be worse than one
            that takes you where the password takes you. */}
        <button
          type="button"
          onClick={() => enter(DEMO_HOST)}
          className="btn btn-outline h-12 px-5 text-sm"
        >
          <GoogleMark />
          Mit Google fortfahren
        </button>
        <button
          type="button"
          onClick={() => enter(DEMO_HOST)}
          className="btn btn-outline h-12 px-5 text-sm"
        >
          <AppleMark />
          Mit Apple fortfahren
        </button>
      </div>

      {/*
        The demo door, and it is labelled as one.

        Anybody looking at this prototype wants to see the signed-in side, and
        making them invent an address and a password first is a toll gate in
        front of a room that is already unlocked. It signs in as the host the
        dashboard's data actually belongs to, so the name in the greeting and
        the areas in the list are the same person.
      */}
      <div className="mt-7 rounded-[var(--radius)] border border-dashed border-teal/35 bg-teal-50/60 p-4">
        <p className="flex items-start gap-2.5 text-xs leading-relaxed text-ink">
          <Info className="mt-px h-3.5 w-3.5 shrink-0 text-teal" strokeWidth={2} />
          Prototyp ohne echte Konten. Jede gültige Eingabe legt eine Demo-Sitzung
          an, mit der Du das Host-Dashboard so siehst wie ein angemeldeter Host.
        </p>
        <button
          type="button"
          onClick={() => enter(DEMO_HOST)}
          className="btn group mt-3 h-10 w-full bg-white px-4 text-xs text-teal shadow-[var(--shadow-sm)] hover:-translate-y-0.5"
        >
          <PlayCircle className="h-4 w-4" strokeWidth={1.75} />
          Direkt als Demo-Host anmelden
          <span className="arrow-nudge inline-flex">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </div>
  )
}

/* Provider marks, inlined: two icons are not worth a dependency, and both
   have to keep their own brand colours to be recognised at all. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[1.05rem] w-[1.05rem]">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.26a12 12 0 0 0 0 10.74l4.01-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.63l4.01 3.09C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  )
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[1.15rem] w-[1.15rem] fill-ink-900">
      <path d="M16.36 12.75c-.03-2.74 2.24-4.06 2.34-4.12-1.28-1.87-3.26-2.13-3.96-2.16-1.69-.17-3.3.99-4.15.99-.85 0-2.17-.97-3.57-.94-1.83.03-3.53 1.07-4.47 2.71-1.91 3.31-.49 8.2 1.37 10.88.91 1.31 1.99 2.78 3.41 2.73 1.37-.06 1.89-.88 3.54-.88 1.65 0 2.12.88 3.56.85 1.47-.02 2.4-1.33 3.3-2.65 1.04-1.52 1.47-2.99 1.49-3.07-.03-.01-2.86-1.1-2.89-4.34ZM13.7 4.6c.75-.91 1.26-2.18 1.12-3.44-1.08.04-2.39.72-3.17 1.63-.7.8-1.31 2.09-1.15 3.32 1.21.09 2.44-.61 3.2-1.51Z" />
    </svg>
  )
}
