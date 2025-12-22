import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Wajib untuk GitHub Pages
  images: {
    unoptimized: true, // Wajib karena GitHub Pages tidak punya server image optimization
  },
};

export default nextConfig;