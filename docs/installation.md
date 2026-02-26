# Installation

## Prerequisites

- Node.js 18.17+
- npm 9+

## Setup

```bash
git clone https://github.com/KaitoJD/About.git
cd About
npm install
npm run dev
# Open http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run build:github` | GitHub Pages build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Troubleshooting

```bash
# Port in use
npx kill-port 3000

# Dependency issues
rm -rf node_modules package-lock.json && npm install

# Build errors
rm -rf .next && npm run build
```