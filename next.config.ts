import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js and related packages (ESM)
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  images: {
    remotePatterns: [
      {
        // Any CDN hostname, any path
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
