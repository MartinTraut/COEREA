/* Brand social glyphs (Lucide dropped brand logos). Inherit currentColor. */
type Props = { className?: string }

export function LinkedInIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.25 8.25h4.5V24H.25V8.25ZM8.5 8.25h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.9c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V24H8.5V8.25Z" />
    </svg>
  )
}

export function FacebookIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  )
}

export function InstagramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.15 0-3.52.01-4.76.07-.86.04-1.33.18-1.64.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.78-.3 1.64-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.86.18 1.33.3 1.64.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.78.26 1.64.3 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.86-.04 1.33-.18 1.64-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.78.3-1.64.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.86-.18-1.33-.3-1.64a2.7 2.7 0 0 0-.66-1.01 2.7 2.7 0 0 0-1.01-.66c-.31-.12-.78-.26-1.64-.3-1.24-.06-1.61-.07-4.76-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82Zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
    </svg>
  )
}

export function XingIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.19 0c-.24 0-.44.08-.55.28-.11.2-.1.44.02.68l3.77 6.53-5.9 10.42c-.12.24-.13.48-.02.68.11.2.29.29.53.29h2.78c.42 0 .62-.28.76-.54l6-10.6c-.01-.02-3.82-6.67-3.82-6.67-.14-.26-.35-.55-.78-.55h-2.77ZM3.6 4.52c-.42 0-.62.27-.76.53L.98 8.6c-.13.24-.12.48 0 .68l1.9 3.28c.14.26.35.54.77.54h2.78c.24 0 .42-.09.53-.29.11-.2.1-.44-.02-.68L5.06 8.6l1.94-3.35c.12-.24.13-.48.02-.68-.11-.2-.29-.28-.53-.28H3.6Z" />
    </svg>
  )
}

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "linkedin":
      return <LinkedInIcon className={className} />
    case "facebook":
      return <FacebookIcon className={className} />
    case "instagram":
      return <InstagramIcon className={className} />
    case "xing":
      return <XingIcon className={className} />
    default:
      return null
  }
}
