import type { NextConfig } from "next";

// Check if we're building for GitHub Pages deployment
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Only set basePath and assetPrefix for GitHub Pages deployment
  ...(isGithubPages ? {
    basePath: process.env.GITHUB_PAGES_BASE_PATH || "",
    assetPrefix: process.env.GITHUB_PAGES_BASE_PATH || "",
  } : {}),
  
  // Ensure trailing slash is added
  trailingSlash: true,
  
  // Disable server-side features not compatible with static export
  experimental: {
    // Disable any server-side features if needed
  },
};

export default nextConfig;
