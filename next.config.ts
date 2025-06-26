import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Set base path for GitHub Pages (uncomment and modify if your repo isn't at root)
  // basePath: '/your-repo-name',
  
  // Ensure trailing slash is added
  trailingSlash: true,
  
  // Disable server-side features not compatible with static export
  experimental: {
    // Disable any server-side features if needed
  },
};

export default nextConfig;
