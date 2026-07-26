import Image from "next/image"

import { cn } from "@/lib/utils"
import { categoryBySlug } from "@/lib/categories"

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
        Size badge. Measured on the "Flächen entdecken" frame: on a 360px card
        the 110x45 box sits 34px in from the right edge and 30px up from the
        bottom, with a 3px rule. Expressed as a percentage of the card so it
        holds in both the 360px overview grid and the 496px category grid —
        `right-0` used to push the right border under `overflow-hidden`, which
        clipped it away.
      */}
      {size ? (
        <span className="absolute right-[9.4%] bottom-[8.3%] z-10 border-[length:clamp(2px,0.22vw,3px)] border-teal bg-white px-3 py-1 text-base text-teal lg:px-3.5 lg:py-1.5 lg:text-xl">
          {size}
        </span>
      ) : null}
    </div>
  )
}
