import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dropbox.com', // Updated from dropboxusercontent.com
      },
    ],
  },
};

export default nextConfig;
