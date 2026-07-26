import Link from "next/link"
import { ChevronRight } from "lucide-react"

/** One step in the trail; the same shape `breadcrumbNode` consumes. */
export type Crumb = { name: string; path: string }

/*
  The visible counterpart to `breadcrumbNode`. The listing detail and category
  pages published a BreadcrumbList in their JSON-LD and set
  `hasBreadcrumb: true`, but no trail was ever drawn on the page — so structured
  data described navigation that visitors did not have, and the deepest pages on
  the site offered no way up other than the browser's back button.

  Both now read the same array: pass the trail here and to `breadcrumbNode`, and
  the two cannot drift apart. The last entry is the current page, so it is not a
  link and carries `aria-current`.
*/
export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  const items: readonly Crumb[] = [{ name: "Startseite", path: "/" }, ...trail]

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[0.8125rem] text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-x-1">
              {i > 0 && (
                <ChevronRight
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-teal/40"
                  strokeWidth={2}
                />
              )}
              {isLast ? (
                /*
                  Truncated rather than wrapped: an area title can run to a full
                  line on its own, and the trail is orientation, not content.
                */
                <span
                  aria-current="page"
                  className="max-w-[22ch] truncate font-medium text-ink-900 sm:max-w-[40ch]"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="underline-offset-2 transition-colors duration-200 hover:text-teal hover:underline focus-visible:text-teal"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
