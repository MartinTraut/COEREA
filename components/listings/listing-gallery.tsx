"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { setOutsideInert } from "@/lib/inert"
import { lockScroll } from "@/lib/scroll-lock"
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
  const closeRef = useRef<HTMLButtonElement>(null)
  /*
    Which control opened the lightbox, so focus can go back to it.

    Reading `document.activeElement` inside the effect looked like it did this
    and did not: React applies `autoFocus` during the commit phase, before
    passive effects run, so by then the active element was already the close
    button inside the dialog. On close, focus was handed to an element that had
    just been removed from the document and fell through to `<body>` — a
    keyboard user was dropped back at the top of the page every time they shut a
    photo. Recorded on the click instead, before anything moves.
  */
  const openerRef = useRef<HTMLElement | null>(null)

  const open = (index?: number) => {
    openerRef.current = document.activeElement as HTMLElement | null
    if (index !== undefined && index >= 0) setActive(index)
    setLightbox(true)
  }

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

    Both helpers hand back their own undo instead of being called a second time
    with an "off" argument. The old shape could not clean up after a dialog that
    unmounts on close — see the note in lib/inert.ts — which left the whole page
    inert and unclickable after looking at a photo.
  */
  useEffect(() => {
    if (!lightbox) return
    const opener = openerRef.current
    const restore = setOutsideInert(dialogRef.current)
    const unlock = lockScroll()
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      unlock()
      restore()
      opener?.focus?.()
    }
  }, [lightbox, step])

  /*
    Swipe. The only way to change photo was two 48px buttons lying on top of the
    picture — on a phone the first thing anybody tries in a gallery is to swipe,
    and nothing happened. A start and an end coordinate are enough; no library,
    no pointer capture, and a 45px threshold so a vertical scroll or a tap does
    not count as a swipe.
  */
  const swipeX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    swipeX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const from = swipeX.current
    const to = e.changedTouches[0]?.clientX
    swipeX.current = null
    if (from === null || to === undefined) return
    const dx = to - from
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1)
  }

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
          onClick={() => open(0)}
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
                  onClick={() => open(src ? photos.indexOf(src) : undefined)}
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
                {/*
                  This button covers roughly a quarter of the tile underneath it
                  and used to open the gallery at photo 1, while the tile itself
                  opened its own photo. One tile, two outcomes depending on
                  which square millimetre was hit. It now opens the same photo
                  the tile shows.
                */}
                {last ? (
                  <button
                    type="button"
                    onClick={() => open(src ? photos.indexOf(src) : undefined)}
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
          /*
            Only a click that lands on the backdrop itself closes. Without the
            target check, any drag that started on the photo and ended beside it
            — a failed pan, an imprecise swipe — bubbled up to this handler and
            shut the gallery. On a touchscreen that was most attempts.
          */
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(false)
          }}
        >
          <div className="flex justify-end p-4">
            <button
              type="button"
              ref={closeRef}
              onClick={() => setLightbox(false)}
              aria-label="Galerie schließen"
              className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] text-white transition-colors hover:text-gold"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-10"
            /* Same rule as the backdrop: the dark area around the photo closes,
               the photo and the controls on it do not. */
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightbox(false)
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {photos.length > 1 ? (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Vorheriges Foto"
                className="nav-arrow nav-arrow-dark absolute left-2 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            ) : null}

            <div className="relative h-full max-h-[76svh] w-full max-w-5xl">
              <Image
                src={hero}
                /* The alt was the same on every photo, so paging through the
                   gallery read as the identical image over and over. */
                alt={
                  photos.length > 1
                    ? `${alt ?? "Foto der Fläche"}, Foto ${active + 1} von ${photos.length}`
                    : (alt ?? "Foto der Fläche")
                }
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
                className="nav-arrow nav-arrow-dark absolute right-2 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            ) : null}

            {/* Announced, because paging with the arrow keys otherwise gives a
                screen reader nothing at all to report. */}
            <p aria-live="polite" className="absolute bottom-2 text-sm text-white/70">
              {active + 1} / {photos.length}
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}
