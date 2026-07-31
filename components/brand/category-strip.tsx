import { CATEGORIES } from "@/lib/categories"
import { CategoryDiamond } from "@/components/brand/category-diamond"
import { EdgeFadeScroller } from "@/components/brand/edge-fade-scroller"

/*
  The row of eight category diamonds that sits under the page heading on both
  "Flächen entdecken" and the listing detail view.

  It stays a horizontal scroller until `lg`. The eight diamonds need roughly
  790px of room, so releasing the scroller at `md` (768px) pushed the last one
  past the viewport and gave the whole page a horizontal scrollbar at tablet
  widths.

  On a phone that scroller ended at the viewport edge with nothing to say the
  remaining categories were there — see EdgeFadeScroller, which supplies the
  fade. This file stays a server component so `hrefFor` can keep being a
  function.
*/
export function CategoryStrip({
  active,
  hrefFor,
}: {
  /** Slug of the category to mark as current, if any. */
  active?: string
  /** Target for each diamond; defaults to the category page. */
  hrefFor?: (slug: string) => string
}) {
  return (
    <EdgeFadeScroller className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max justify-between gap-3 pb-1 lg:min-w-0">
        {CATEGORIES.map((c) => (
          <CategoryDiamond
            key={c.slug}
            icon={c.icon}
            label={c.label}
            access={c.access}
            active={active === c.slug}
            href={
              hrefFor
                ? hrefFor(c.slug)
                : active === c.slug
                  ? "/flaechen"
                  : `/flaechen/kategorie/${c.slug}`
            }
          />
        ))}
      </div>
    </EdgeFadeScroller>
  )
}
