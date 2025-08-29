import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds: true, // Ignore ESLint errors during build,

  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
   images: {
    domains: ['ik.imagekit.io'],
  },
};

export default nextConfig;
