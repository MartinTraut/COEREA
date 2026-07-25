import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Allow the dev server to be opened from the local network (real iPhone)
  // and from the local iPhone-frame preview harness.
  allowedDevOrigins: ["192.168.2.97", "localhost", "127.0.0.1"],
}

export default nextConfig
