import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.youtube.com", "www.dropbox.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dropbox.com",
      },
      {
        protocol: "https",
        hostname: "www.drnimbs.com", // Added for your testimonial image
      },
    ],
  },
};

export default nextConfig;
