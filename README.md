# Portfolio - Nguyen Sy Nguyen

A modern, responsive portfolio website built with Next.js 15, React, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with interactive tech stack showcase
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Performance**: Optimized for speed with Next.js static export
- **Type Safe**: Built with TypeScript for better development experience
- **Accessible**: Following web accessibility best practices

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Styling**: TailwindCSS
- **Fonts**: Source Code Pro, JetBrains Mono
- **Deployment**: GitHub Pages
- **Build Tools**: Next.js, npm

## 🏃‍♂️ Development

```bash
# Install dependencies
npm install

# Start development server
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

This project is automatically deployed to GitHub Pages when you push to the `main` branch.

### GitHub Pages Setup

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. The workflow will automatically build and deploy your site

### Manual Deployment

If you want to deploy manually:

```bash
# Build for GitHub Pages
npm run build:github

# Deploy the `out` directory to your hosting provider
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   └── ...
├── public/                  # Static assets
├── .github/workflows/       # GitHub Actions workflows
└── ...
```

## 🎨 Customization

- **Colors**: Edit the color scheme in `src/app/globals.css`
- **Content**: Update your information in `src/app/page.tsx`
- **Tech Stack**: Modify the technologies in `src/components/TechStackDynamic.tsx`
- **Fonts**: Change fonts in `src/app/layout.tsx`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
