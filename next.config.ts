import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Allow the dev server to be opened from the local network (real iPhone)
  // and from the local iPhone-frame preview harness.
  allowedDevOrigins: ["192.168.2.97", "localhost", "127.0.0.1"],

  images: {
    // The photo sources are now the full-resolution originals, so it pays to
    // ship the modern formats — AVIF first, WebP for anything that cannot take
    // it. Without this Next only emits WebP.
    formats: ["image/avif", "image/webp"],
    /*
      Measured, not guessed: /flaechen shipped 1.33 MB of photographs for twelve
      thumbnails, about 110 kB for a picture drawn 306 CSS px wide. At the
      default quality of 75 the AVIF of a single card came out at 194 kB —
      larger than the JPEG it replaced. These photographs are landscapes and
      foliage, the kind of content where the last few quality points cost the
      most bytes and show the least.

      Next 16 refuses any `quality` that is not on this list, so the values the
      components ask for have to be declared here: 65 for anything in a grid,
      the default 75 kept for the full-width heroes and the lightbox.
    */
    qualities: [65, 75],
  },
}

export default nextConfig
