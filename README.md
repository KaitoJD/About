# Portfolio - Nguyen Sy Nguyen

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-brightgreen?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

> A modern, interactive portfolio website showcasing my journey as a Software Engineering student at FPT University. Built with cutting-edge technologies and featuring smooth animations, responsive design, and comprehensive accessibility support.

## ✨ Features

### 🎨 **Interactive UI/UX**
- **Custom Loading Screen**: Animated progress bar with accessibility features
- **Typing Animation**: Dynamic text animation for hero section
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile-First Design**: Responsive layout optimized for all devices
- **Dark Mode Support**: Built-in theming with Tailwind CSS

### 🧭 **Navigation & Accessibility**
- **Responsive Header**: Slide-in animation with mobile dropdown menu
- **Keyboard Navigation**: Full keyboard accessibility (Tab, Escape, Arrow keys)
- **ARIA Compliance**: Screen reader support with proper ARIA attributes
- **Focus Management**: Proper focus handling for mobile menu interactions

### 🎯 **Core Sections**
- **Hero Section**: Animated introduction with call-to-action buttons
- **About Me**: Personal story, skills showcase, and tech stack
- **Timeline**: Interactive journey timeline with achievements (2021-2025)
- **Contact**: Professional and personal contact methods with copy-to-clipboard functionality

### 🔧 **Advanced Features**
- **Smart Notification System**: Toast notifications with progress bars
- **Intersection Observer**: Scroll-triggered animations for enhanced UX
- **Performance Optimized**: Static export with optimized event listeners
- **Memory Management**: Proper timeout cleanup to prevent memory leaks

## 🛠️ Tech Stack

### **Core Technologies**
- **Framework**: Next.js 15.3.4 with App Router & Turbopack
- **Language**: TypeScript 5+ with strict type checking
- **Styling**: Tailwind CSS 4.0+ with custom animations
- **State Management**: React 19 Hooks (useState, useRef, useCallback, useEffect)

### **UI/UX Libraries**
- **Icons**: React Icons 5.5.0 for comprehensive icon support
- **Utilities**: clsx 2.1.1 for conditional CSS classes
- **Fonts**: JetBrains Mono for clean, monospace typography

### **Development & Deployment**
- **Linting**: ESLint 9 with Next.js configuration
- **Build Tool**: Next.js built-in bundler with Turbopack
- **Deployment**: GitHub Actions + GitHub Pages
- **Cross-Platform**: cross-env for environment variable management

## 🏃‍♂️ Getting Started

### Prerequisites

```bash
Node.js 18.17+ (LTS recommended)
npm 9+ or yarn 1.22+
Git
```

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server with Turbopack (ultra-fast!)
npm run dev

# Open http://localhost:3000 in your browser
```

### Development Commands

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# GitHub Pages build (with basePath)
npm run build:github

# Start production server locally
npm run start

# Lint code
npm run lint
```

## 🏗️ Building & Deployment

### Local Production Build

```bash
npm run build
# Output: .next/ directory
```

### GitHub Pages Deployment

```bash
npm run build:github
# Output: out/ directory (static files)
```

The project is configured for automatic deployment to GitHub Pages:

1. **Automatic**: Push to `master` branch triggers GitHub Actions workflow
2. **Manual**: Run `npm run build:github` and upload `out/` directory

## 📁 Project Structure

```
portfolio/
├── 📂 .github/
│   └── 📂 workflows/
│       └── nextjs.yml              # GitHub Actions CI/CD
├── 📂 public/
│   ├── .nojekyll                   # GitHub Pages configuration
│   ├── favicon.svg                 # Site favicon
│   └── *.svg                       # Static SVG assets
├── 📂 src/
│   ├── 📂 app/                     # Next.js App Router
│   │   ├── globals.css             # Global styles & animations
│   │   ├── layout.tsx              # Root layout with metadata
│   │   └── page.tsx                # Main portfolio page (1200+ lines)
│   ├── 📂 components/              # Reusable React components
│   │   ├── Loading.tsx             # Custom loading screen
│   │   ├── TechStack3D.tsx         # 3D tech stack (future feature)
│   │   └── TechStackDynamic.tsx    # Interactive tech icons
│   └── 📂 styles/
│       └── loading.css             # Loading screen animations
├── 📂 out/                         # Static export output (GitHub Pages)
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies & scripts
├── tailwind.config.ts              # Tailwind CSS customization
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## 🎨 Key Components Deep Dive

### 🔄 Loading Screen (`Loading.tsx`)
```typescript
// Features:
- Configurable progress animation
- ARIA accessibility attributes
- Smooth transitions with onComplete callback
- Memory-efficient timeout management
```

### 📱 Mobile Navigation
```typescript
// Features:
- Responsive dropdown with backdrop blur
- Click-outside-to-close functionality
- Keyboard accessibility (Escape key)
- Smooth scale animations
```

### 🚀 Tech Stack Showcase (`TechStackDynamic.tsx`)
```typescript
// Features:
- Dynamic React Icons integration
- Responsive grid layout
- Hover animations
- Categorized technology display
```

### 📋 Notification System
```typescript
// Features:
- Copy-to-clipboard functionality
- Progress bar countdown
- Smooth entrance/exit animations
- Named constants for timing management
```

## 🔧 Customization Guide

### 📝 Content Updates

**Personal Information** (`src/app/page.tsx`):
```typescript
// Update these constants:
const fullText = "Your Name Here";
const descriptionText = "Your description...";

// Update timeline achievements in Timeline Section
// Update contact methods in Contact Section
```

**Tech Stack** (`src/components/TechStackDynamic.tsx`):
```typescript
// Add/modify technologies with React Icons
const technologies = [
  { name: "Technology", icon: IconComponent, category: "frontend" }
];
```

### 🎨 Styling Customization

**Theme Colors** (`tailwind.config.ts`):
```typescript
theme: {
  colors: {
    primary: "#your-color",
    secondary: "#your-color"
  }
}
```

**Animations** (`src/app/globals.css`):
```css
/* Customize keyframes and transitions */
@keyframes your-animation {
  /* Your animation */
}
```

### ⚙️ Configuration

**GitHub Pages** (`next.config.ts`):
```typescript
// Update basePath for your repository
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name',
```

**SEO & Metadata** (`src/app/layout.tsx`):
```typescript
// Update site metadata
title: "Your Name - Portfolio"
description: "Your description"
```

## 🌟 Performance Features

- ⚡ **Static Export**: Zero JavaScript runtime required
- 🎯 **Code Splitting**: Automatic component-level splitting
- 🧹 **Memory Management**: Proper cleanup of event listeners and timeouts
- 📱 **Mobile Optimized**: Touch-friendly interactions
- ♿ **Accessibility**: WCAG 2.1 compliant
- 🔍 **SEO Ready**: Proper meta tags and semantic HTML

## 🚀 Deployment Options

### GitHub Pages (Recommended)
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Custom domains supported
- ✅ CI/CD with GitHub Actions

### Other Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `out/` folder
- **Static Hosting**: Upload `out/` to any web server

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with ❤️ by Nguyen Sy Nguyen</p>
  <p>
    <a href="mailto:contact.nguyensynguyen@gmail.com">Email</a> •
    <a href="https://linkedin.com/in/nguyensynguyen">LinkedIn</a> •
    <a href="https://github.com/yourusername">GitHub</a>
  </p>
</div>
- **GitHub Pages**: Adjust `basePath` in `next.config.ts` for your repo name
- **Deployment**: Modify `.github/workflows/nextjs.yml` if needed

## 🌟 Features Highlights

- **Performance**: Optimized event listeners with proper cleanup
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Mobile-first design with Tailwind CSS
- **Modern React**: Uses hooks, refs, and functional components
- **Type Safety**: Full TypeScript coverage
- **CI/CD**: Automated deployment with GitHub Actions

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
