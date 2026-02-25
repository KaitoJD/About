# Architecture

## Project Structure

```
About/
├── .github/workflows/nextjs.yml   # CI/CD pipeline
├── docs/                          # Documentation
├── public/                        # Static assets (favicon, SVGs)
├── src/
│   ├── app/
│   │   ├── globals.css            # Global styles & animations
│   │   ├── layout.tsx             # Root layout & metadata
│   │   └── page.tsx               # Main page
│   ├── components/
│   │   ├── Loading.tsx            # Loading screen
│   │   └── TechStackDynamic.tsx   # Tech stack icons
│   └── styles/loading.css         # Loading animations
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Components

- **`page.tsx`** — Main portfolio page with typing animation, navigation, timeline, and contact section
- **`Loading.tsx`** — Animated loading screen with progress bar
- **`TechStackDynamic.tsx`** — Responsive grid of tech icons organized by category

## Animations

1. Loading screen progress bar
2. Typing effect for hero text
3. Staged entrance animations
4. Hover effects & mobile menu transitions

## Key Config

- **Static export** via `output: 'export'` in `next.config.ts`
- **GitHub Pages** paths handled with `basePath` / `assetPrefix`
- **Tailwind CSS** configured through PostCSS
- **TypeScript** strict mode with `@/*` path alias