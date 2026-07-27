"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { setOutsideInert } from "@/lib/inert"
import { ListingImage } from "@/components/brand/listing-image"

/*
  Detail gallery: one large hero image plus a 2×2 cluster of supporting shots,
  the last carrying the „alle Fotos anzeigen" action.

  Both the action and the dots under the hero used to be decoration — the dots
  were `aria-hidden` and unclickable, the button had no handler. They now drive
  a real lightbox: click, arrow keys and Escape all work, and the dots select
  the hero shot directly.
*/
export function ListingGallery({
  category,
  tone,
  size,
  image,
  alt,
  more = [],
}: {
  category: string
  tone: number
  size: string
  image?: string
  alt?: string
  more?: string[]
}) {
  const photos = [image, ...more].filter((p): p is string => Boolean(p))
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const hero = photos[active] ?? image
  const cluster = [more[0], more[1], more[2], more[3]]

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + photos.length) % Math.max(photos.length, 1)),
    [photos.length],
  )

  /*
    The dialog declared `aria-modal="true"` but nothing enforced it: `autoFocus`
    on the close button was the only measure, so everything behind the overlay
    stayed tabbable and was still read out. `setOutsideInert` makes the claim
    true, and focus returns to whatever opened the lightbox rather than being
    dropped on the document.
  */
  useEffect(() => {
    if (!lightbox) return
    const opener = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    setOutsideInert(true, dialog)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      setOutsideInert(false, dialog)
      opener?.focus?.()
    }
  }, [lightbox, step])

  return (
    <>
      {/*
        The cluster used to size itself from its own 4:3 tiles, which never came
        out the same height as the 16:11 hero beside it — hence the band of empty
        page down the right-hand side.

        Making both columns `h-full` alone was not enough and in fact made it
        worse: with every child sized from its parent and the parent sized from
        its children, the row had no intrinsic height left and collapsed to 12px
        — the lead photo of the whole page vanished. The row therefore carries
        an explicit height from `lg` up, and the children fill it. Below `lg`
        the columns stack, so there the tiles keep their own aspect ratios.
      */}
      <div className="grid gap-3 lg:h-[clamp(22rem,30vw,30rem)] lg:grid-cols-[1.55fr_1fr]">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Foto vergrößern"
          className="media-zoom block w-full overflow-hidden rounded-[var(--radius)] lg:h-full"
        >
          <ListingImage
            category={category}
            tone={tone}
            image={hero}
            alt={alt}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="aspect-[16/11] lg:aspect-auto lg:h-full"
          />
        </button>

        {/* 2×2 cluster */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:h-full">
          {cluster.map((src, i) => {
            const last = i === 3
            return (
              <div key={i} className="relative min-h-0">
                <button
                  type="button"
                  onClick={() => {
                    if (src) setActive(photos.indexOf(src))
                    setLightbox(true)
                  }}
                  className="media-zoom block h-full w-full overflow-hidden rounded-[var(--radius)]"
                  aria-label={`Foto ${i + 2} vergrößern`}
                >
                  <ListingImage
                    category={category}
                    tone={(tone + i + 1) % 6}
                    image={src}
                    alt={alt}
                    className="aspect-[4/3] lg:aspect-auto lg:h-full"
                    size={i === 0 ? size : undefined}
                  />
                </button>
                {last ? (
                  <button
                    type="button"
                    onClick={() => setLightbox(true)}
                    className="btn btn-teal absolute inset-x-2 bottom-2 z-10 px-3 py-2 text-xs"
                  >
                    <Images className="h-3.5 w-3.5" /> alle Fotos anzeigen
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      {photos.length > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {photos.map((p, i) => (
            <button
              key={p}
              type="button"
              aria-label={`Foto ${i + 1} anzeigen`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
              className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)]"
            >
              {/*
                The indicator used to animate `width` from w-1.5 to w-6, which
                lays out the flex row on every frame for 300ms and shoves the
                neighbouring dots along with it — the same layout-during-
                animation fault that cost us the header. The track is now a fixed
                width and only its scale changes, which stays on the compositor.
              */}
              <span
                className={cn(
                  "h-1.5 w-6 origin-left transition-transform duration-300 ease-[var(--ease-brand)]",
                  i === active ? "bg-teal" : "bg-teal/25",
                )}
                style={{ transform: `scaleX(${i === active ? 1 : 0.25})` }}
              />
            </button>
          ))}
        </div>
      ) : null}

      {lightbox && hero ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Fotogalerie"
          className="fixed inset-0 z-100 flex flex-col bg-ink/95 motion-safe:animate-[coarea-fade-up_200ms_ease-out]"
          onClick={() => setLightbox(false)}
        >
          <div className="flex justify-end p-4">
            <button
              type="button"
              autoFocus
              onClick={() => setLightbox(false)}
              aria-label="Galerie schließen"
              className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] text-white transition-colors hover:text-gold"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            {photos.length > 1 ? (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Vorheriges Foto"
                className="absolute left-2 grid h-12 w-12 place-items-center rounded-[var(--radius-control)] bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            ) : null}

            <div className="relative h-full max-h-[76svh] w-full max-w-5xl">
              <Image
                src={hero}
                alt={alt ?? "Foto der Fläche"}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {photos.length > 1 ? (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Nächstes Foto"
                className="absolute right-2 grid h-12 w-12 place-items-center rounded-[var(--radius-control)] bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            ) : null}

            <p className="absolute bottom-2 text-sm text-white/70">
              {active + 1} / {photos.length}
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}
