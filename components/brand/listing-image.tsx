import Image from "next/image"

import { cn } from "@/lib/utils"
import { categoryBySlug } from "@/lib/categories"
import { AreaChip } from "@/components/brand/area-chip"

/*
  Listing visual. When a real photo is provided it is rendered edge-to-edge
  (object-cover); otherwise we fall back to an on-brand gradient + schraffur +
  faint category icon. The optional size badge sits bottom-right as in the design.
*/
const TONES = [
  "from-[#6ea06a] to-[#3f6f47]", // field
  "from-[#3f6f47] to-[#25493a]", // forest
  "from-[#7fb36e] to-[#4c8a54]", // garden
  "from-[#b98a5e] to-[#7c5a3c]", // commercial / brick
  "from-[#c56f5a] to-[#8a4436]", // sport court
  "from-[#5aa79c] to-[#2d8d80]", // teal
]

export function ListingImage({
  category,
  tone = 0,
  size,
  image,
  alt,
  className,
  rounded = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
}: {
  category: string
  tone?: number
  size?: string
  image?: string
  alt?: string
  className?: string
  rounded?: string
  sizes?: string
  priority?: boolean
}) {
  const cat = categoryBySlug(category)
  const Icon = cat?.icon
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-br",
        !image && TONES[tone % TONES.length],
        rounded,
        className,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={alt ?? cat?.label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <div className="hatch-white absolute inset-0 opacity-30" aria-hidden />
          {Icon ? (
            <Icon className="relative h-16 w-16 text-white/45 [--icon-knockout:transparent]" />
          ) : null}
        </>
      )}
      {/*
        The size marker used to be placed in percentages of the tile — 9.4% in,
        8.3% up — because it was measured off one 360px frame. A percentage
        inset is not a position, it is a drift: on the wide gallery tile it
        floated an inch inside the corner, on a small one it sat almost on the
        edge. A fixed inset keeps it in the same corner at every width.
      */}
      {size ? (
        <AreaChip
          value={size}
          scale="lg"
          className="absolute right-3 bottom-3 z-10 lg:right-4 lg:bottom-4"
        />
      ) : null}
    </div>
  )
}
