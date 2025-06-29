# About Me - Nguyen Sy Nguyen

A modern, responsive website built with Next.js 15, React, TypeScript, and Tailwind CSS. Features a custom loading screen, interactive mobile menu, and comprehensive accessibility support.

## ✨ Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for all devices with mobile-first approach
- **Interactive UI**: Custom loading screen, mobile dropdown menu, and smooth scrolling
- **Accessibility**: Full keyboard navigation, ARIA attributes, and screen reader support
- **Performance Optimized**: Static export with optimized event listeners and React best practices
- **Tech Stack Showcase**: Dynamic tech icons using React Icons
- **GitHub Pages Ready**: Configured for seamless deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Hooks (useState, useRef, useCallback)
- **Utilities**: clsx for conditional styling
- **Deployment**: GitHub Pages with GitHub Actions
- **Font**: JetBrains Mono (monospace)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/yourusername/About.git
cd About

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Visit http://localhost:3000
```

## 🏗️ Building

```bash
# Build for local deployment
npm run build

# Build for GitHub Pages deployment
npm run build:github

# The output will be in the `out` directory
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages when you push to the `master` branch.

### GitHub Pages Setup

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push to `master` branch and the workflow will automatically build and deploy

### Manual Deployment

```bash
# Build for GitHub Pages
npm run build:github

# The `out` directory contains the static files ready for deployment
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles and animations
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main portfolio page
│   ├── components/          # React components
│   │   ├── Loading.tsx      # Custom loading screen
│   │   └── TechStackDynamic.tsx  # Tech stack with icons
│   └── styles/
│       └── loading.css      # Loading screen animations
├── public/                  # Static assets (SVG icons)
├── .github/workflows/       # GitHub Actions for deployment
│   └── nextjs.yml          # CI/CD workflow
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Key Components

### Loading Screen
- Custom animated progress bar
- Accessibility features with ARIA attributes
- Configurable timing and progress logic

### Mobile Menu
- Responsive dropdown with smooth animations
- Keyboard accessibility (Escape key support)
- Click-outside-to-close functionality

### Tech Stack
- Dynamic icons using React Icons
- DRY component architecture
- Responsive grid layout

## 🔧 Customization

### Content
- **Personal Info**: Update details in `src/app/page.tsx`
- **Tech Stack**: Modify technologies in `src/components/TechStackDynamic.tsx`
- **Projects**: Add your projects in the Projects section
- **Contact Info**: Update contact details and social links

### Styling
- **Colors**: Edit theme colors in `tailwind.config.ts`
- **Animations**: Customize in `src/app/globals.css`
- **Loading Screen**: Configure timing in `src/components/Loading.tsx`

### Configuration
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
