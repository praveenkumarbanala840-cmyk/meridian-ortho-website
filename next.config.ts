import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows the dev server's HMR websocket to work when testing over LAN
  // (e.g. `npm run dev -- -H 0.0.0.0` and loading the page from a phone).
  allowedDevOrigins: ["192.168.1.44"],
};

export default nextConfig;
