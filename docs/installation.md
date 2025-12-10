# Installation Guide

## Prerequisites

```bash
Node.js 18.17+ (LTS recommended)
npm 9+ or yarn 1.22+
Git
```

## Installation & Development

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/KaitoJD/About.git
cd About

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
# Start development server with Turbopack (ultra-fast!)
npm run dev

# Open http://localhost:3000 in your browser
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run build:github` | Build for GitHub Pages deployment |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint code analysis |

## Environment Setup

### VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Prettier - Code formatter**
- **ESLint**

### Development Configuration

The project includes:
- TypeScript configuration (`tsconfig.json`)
- ESLint configuration (`eslint.config.mjs`)
- PostCSS configuration with Tailwind (`postcss.config.mjs`)
- Next.js configuration (`next.config.ts`)

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

**Node modules issues:**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```