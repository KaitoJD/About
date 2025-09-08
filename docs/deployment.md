# Build & Deployment Guide

## Building the Project

### Local Development Build

```bash
npm run dev
# Starts development server on http://localhost:3000
```

### Production Build

```bash
npm run build
# Output: .next/ directory
# Creates optimized production build
```

### GitHub Pages Build

```bash
npm run build:github
# Output: out/ directory (static files)
# Builds static export for GitHub Pages
```

## Deployment Options

### GitHub Pages (Current)

**Automatic Deployment:**
1. Push changes to `main` or `master` branch
2. GitHub Actions workflow automatically triggers
3. Site deploys to `https://yourusername.github.io/yourrepository/`

**Manual Deployment:**
```bash
npm run build:github
# Upload contents of 'out/' directory to GitHub Pages
```

**GitHub Actions Configuration:**
- Located in `.github/workflows/nextjs.yml`
- Automatic deployment on push to main branch
- Static export optimized for GitHub Pages

### Vercel (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Netlify (Alternative)

1. Build the project: `npm run build:github`
2. Drag & drop the `out/` folder to Netlify
3. Or connect GitHub repository for automatic deploys

### Static Hosting (Any Server)

```bash
npm run build:github
# Upload contents of 'out/' directory to any web server
```

## GitHub Pages Configuration

The project is configured specifically for GitHub Pages deployment:

**next.config.ts:**
```typescript
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? '/About' : '',
  assetPrefix: isGithubPages ? '/About/' : '',
};
```

**Key GitHub Pages Features:**
- Static export (`output: 'export'`)
- Image optimization disabled for static hosting
- Proper asset paths with basePath
- `.nojekyll` file to prevent Jekyll processing

## Build Output

### Development Build
- **Location**: `.next/` directory
- **Purpose**: Development server files
- **Features**: Hot reloading, source maps, debug info

### Production Build
- **Location**: `.next/` directory
- **Purpose**: Optimized production files
- **Features**: Minification, tree shaking, optimization

### Static Export
- **Location**: `out/` directory
- **Purpose**: Static files for hosting
- **Features**: No server required, CDN-friendly

## Environment Variables

```bash
# GitHub Pages build
GITHUB_PAGES=true npm run build:github

# Regular production build
npm run build
```

## Performance Optimization

The build process includes:
- **Code Splitting**: Automatic component-level splitting
- **Tree Shaking**: Removes unused code
- **Minification**: Reduces bundle size
- **Image Optimization**: Responsive images (disabled for static export)
- **CSS Optimization**: Removes unused CSS classes