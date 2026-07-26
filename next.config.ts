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
  },
}

export default nextConfig
