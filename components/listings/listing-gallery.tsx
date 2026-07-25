import { Images } from "lucide-react"

import { cn } from "@/lib/utils"
import { ListingImage } from "@/components/brand/listing-image"

/*
  Detail gallery: one large hero image with carousel dots, plus a 2×2 cluster of
  four supporting shots — the last carrying the „alle Fotos anzeigen" action.
  `image` is the listing's own photo; `more` are related shots that round out
  the cluster. Any missing slot falls back to the on-brand placeholder.
*/
export function ListingGallery({
  category,
  tone,
  size,
  image,
  more = [],
}: {
  category: string
  tone: number
  size: string
  image?: string
  more?: string[]
}) {
  const cluster = [more[0], more[1], more[2], more[3]]
  return (
    <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr]">
      {/* main */}
      <div>
        <ListingImage
          category={category}
          tone={tone}
          image={image}
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="aspect-[16/11]"
        />
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i === 0 ? "bg-teal" : "bg-ink/20",
              )}
            />
          ))}
        </div>
      </div>

      {/* 2×2 cluster */}
      <div className="grid grid-cols-2 gap-3">
        <ListingImage category={category} tone={(tone + 1) % 6} image={cluster[0]} className="aspect-[4/3]" size={size} />
        <ListingImage category={category} tone={(tone + 2) % 6} image={cluster[1]} className="aspect-[4/3]" />
        <ListingImage category={category} tone={(tone + 3) % 6} image={cluster[2]} className="aspect-[4/3]" />
        <div className="relative">
          <ListingImage category={category} tone={(tone + 4) % 6} image={cluster[3]} className="aspect-[4/3]" />
          <button
            type="button"
            className="absolute inset-x-2 bottom-2 z-10 inline-flex items-center justify-center gap-1.5 bg-teal/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-teal"
          >
            <Images className="h-3.5 w-3.5" /> alle Fotos anzeigen
          </button>
        </div>
      </div>
    </div>
  )
}
