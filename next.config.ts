import type { NextConfig } from "next";

// Check if we're building for GitHub Pages deployment
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  
  images: {
    unoptimized: true,
  },
  
  // Only set basePath and assetPrefix for GitHub Pages deployment
  ...(isGithubPages && {
    basePath: '/About',
    assetPrefix: '/About',
  }),
  
  trailingSlash: true,
  
  experimental: {
  },
};

export default nextConfig;
