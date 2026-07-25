import Image from "next/image"

import { cn } from "@/lib/utils"
import { categoryBySlug } from "@/lib/categories"

/*
  Listing visual. When a real photo is provided it is rendered edge-to-edge
  (object-cover); otherwise we fall back to an on-brand gradient + schraffur +
  faint category icon. The optional size badge sits bottom-left as in the design.
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
            <Icon className="relative h-16 w-16 text-white/45" strokeWidth={1.25} />
          ) : null}
        </>
      )}
      {size ? (
        <span className="absolute bottom-2 left-2 z-10 border border-teal bg-white px-2 py-0.5 text-xs font-semibold text-teal">
          {size}
        </span>
      ) : null}
    </div>
  )
}
