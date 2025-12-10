# Customization Guide

## Content Updates

### Personal Information

Edit `src/app/page.tsx` to update personal details:

```typescript
// Hero Section Text
const fullText = "Your Name Here";
const descriptionText = "Your description here...";

// Discord Username (Contact Section)
const discordUsername = "your_discord_username";

// Email (Contact Section)
const emailAddress = "your.email@domain.com";
```

### Timeline Section

Update your achievements and milestones:

```typescript
// Located in the Timeline Section of page.tsx
// Update timeline items with your own achievements
<div className="timeline-item">
  <div className="text-purple-600 dark:text-purple-400 font-semibold text-xs sm:text-sm mb-2">
    2025 - Present
  </div>
  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
    Your Achievement Here
  </h3>
  <div className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-300">
    <p>• Your accomplishment details</p>
    <p>• Another achievement</p>
  </div>
</div>
```

### Tech Stack

Modify `src/components/TechStackDynamic.tsx`:

```typescript
const technologies = [
  { 
    name: "React", 
    icon: FaReact, 
    category: "frontend",
    color: "text-blue-500"
  },
  // Add your technologies here
];

// Categories available:
// "frontend", "backend", "database", "tools", "mobile"
```

## Styling Customization

### Colors & Theme

Edit `src/app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #10b981;
  --secondary: #059669;
  --accent: #34d399;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f0f23;
    --foreground: #e2e8f0;
  }
}
```

### Custom Animations

Add custom animations in `src/app/globals.css`:

```css
@keyframes yourCustomAnimation {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-your-custom {
  animation: yourCustomAnimation 0.6s ease-out forwards;
}
```

### Typography

Update fonts in `src/app/layout.tsx`:

```typescript
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
});
```

## Component Customization

### Loading Screen

Modify `src/components/Loading.tsx`:

```typescript
// Customize loading messages, timing, or animations
const loadingSteps = [
  "Initializing...",
  "Loading assets...",
  "Almost ready...",
  "Complete!"
];
```

### Navigation

Update navigation items in `src/app/page.tsx`:

```typescript
// Desktop Menu
<button onClick={() => scrollToSection('your-section')}>
  Your Section
</button>

// Mobile Menu
<button onClick={() => scrollToSection('your-section')}>
  Your Section
</button>
```

## SEO & Metadata

### Site Metadata

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your custom description",
  keywords: "your, keywords, here",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Portfolio",
    description: "Your custom description",
    url: "https://yourdomain.com",
    siteName: "Your Site Name",
    locale: "en_US",
    type: "website",
  },
};
```

### Favicon & Assets

Replace files in `public/` directory:
- `favicon.svg` - Site favicon
- `icon.svg` - Apple touch icon
- `next.svg` - Next.js logo (if used)

## GitHub Pages Configuration

### Repository Settings

Update `next.config.ts` for your repository:

```typescript
const nextConfig = {
  basePath: '/your-repository-name',
  assetPrefix: '/your-repository-name/',
  // ... other config
};
```

### GitHub Actions

The workflow file `.github/workflows/nextjs.yml` handles automatic deployment. No changes needed unless you want to customize the deployment process.

## Performance Tuning

### Image Optimization

For static export, images are unoptimized by default. To optimize images:

1. Use WebP format for better compression
2. Provide multiple sizes for responsive images
3. Use lazy loading for images below the fold

### Bundle Analysis

Analyze your bundle size:

```bash
npm install --save-dev @next/bundle-analyzer
```

Add to `next.config.ts`:

```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

Run analysis:

```bash
ANALYZE=true npm run build
```