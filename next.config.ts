import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  images: {
    dangerouslyAllowSVG: true, // ✅ Allow SVGs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**", // Allow all icons from simpleicons
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**", // Your other image domain
      },
    ],
  },
};

export default nextConfig;
