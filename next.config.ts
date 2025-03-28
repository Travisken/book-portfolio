import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.youtube.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dropbox.com', // Updated from dropboxusercontent.com
      },
    ],
  },
};

export default nextConfig;
