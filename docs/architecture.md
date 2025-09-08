# Architecture & Technical Details

## Project Structure

```
About/
├── 📂 .github/
│   └── 📂 workflows/
│       └── nextjs.yml              # GitHub Actions CI/CD pipeline
├── 📂 docs/                        # Documentation files
│   ├── installation.md             # Installation guide
│   ├── deployment.md               # Build & deployment guide
│   ├── customization.md            # Customization instructions
│   └── architecture.md             # This file
├── 📂 public/
│   ├── .nojekyll                   # GitHub Pages configuration
│   ├── favicon.svg                 # Site favicon
│   └── *.svg                       # Static SVG assets
├── 📂 src/
│   ├── 📂 app/                     # Next.js App Router
│   │   ├── globals.css             # Global styles & animations
│   │   ├── layout.tsx              # Root layout with metadata
│   │   └── page.tsx                # Main portfolio page
│   ├── 📂 components/              # Reusable React components
│   │   ├── Loading.tsx             # Custom loading screen
│   │   └── TechStackDynamic.tsx    # Interactive tech icons
│   └── 📂 styles/
│       └── loading.css             # Loading screen animations
├── 📂 out/                         # Static export output (GitHub Pages)
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies & scripts
├── tailwind.config.ts              # Tailwind CSS customization
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Main documentation
```

## Tech Stack Details

### Core Framework
- **Next.js 15.3.4**: React framework with App Router
- **React 19.0.0**: Latest React with concurrent features
- **TypeScript 5+**: Static type checking with strict mode

### Styling & UI
- **Tailwind CSS 4.0+**: Utility-first CSS framework
- **Custom CSS**: Hand-crafted animations and transitions
- **React Icons 5.5.0**: Comprehensive icon library

### Development Tools
- **Turbopack**: Ultra-fast bundler for development
- **ESLint 9**: Code linting with Next.js rules
- **cross-env**: Cross-platform environment variables

## Key Components Deep Dive

### Loading Component (`Loading.tsx`)

**Features:**
- Configurable progress animation with realistic timing
- ARIA accessibility attributes for screen readers
- Memory-efficient timeout management
- Smooth transitions with completion callback

**Code Structure:**
```typescript
interface LoadingProps {
  onComplete: () => void;
}

// Key features:
- Progress simulation with realistic increments
- Screen reader announcements
- Cleanup on unmount
```

### Main Page Component (`page.tsx`)

**Architecture:**
- **State Management**: Multiple useState hooks for animation sequences
- **Event Handling**: Keyboard navigation, mobile interactions
- **Memory Management**: Proper cleanup of timeouts and event listeners
- **Accessibility**: ARIA attributes, focus management

**Key State Variables:**
```typescript
// Animation sequence states
const [showTyping, setShowTyping] = useState(false);
const [typedText, setTypedText] = useState('');
const [showButtons, setShowButtons] = useState(false);
const [showHeader, setShowHeader] = useState(false);
const [isAnimationsComplete, setIsAnimationsComplete] = useState(false);

// UI interaction states
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [showCopyNotification, setShowCopyNotification] = useState(false);
```

### Tech Stack Component (`TechStackDynamic.tsx`)

**Features:**
- Dynamic icon rendering with React Icons
- Responsive grid layout with CSS Grid
- Category-based technology organization
- Hover animations with CSS transitions

## Animation System

**Note: Scroll-based animations have been removed for improved performance and user experience.**

### Remaining Animations
1. **Loading Screen**: Progress bar with smooth transitions
2. **Typing Effect**: Character-by-character text animation
3. **Entrance Animations**: Staged component appearances
4. **Hover Effects**: Interactive element animations
5. **Mobile Menu**: Slide and scale transitions

### Animation Timing
```typescript
// Carefully orchestrated timing constants
const NOTIFICATION_ENTER_DELAY = 10;      // ms
const NOTIFICATION_DISPLAY_DURATION = 2500; // ms
const NOTIFICATION_TOTAL_DURATION = 3000;   // ms
```

## Performance Features

### Memory Management
- **Timeout Cleanup**: All setTimeout calls are tracked and cleaned up
- **Event Listener Cleanup**: Proper removal of event listeners
- **Ref Management**: useRef for DOM references and mutable values

### Optimization Strategies
- **Static Export**: Zero JavaScript runtime required for hosting
- **Code Splitting**: Automatic component-level splitting by Next.js
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Disabled for static export compatibility

### Accessibility Features
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus handling in mobile menu
- **Semantic HTML**: Proper HTML structure for assistive technologies

## Configuration Files

### Next.js Configuration (`next.config.ts`)
```typescript
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',              // Static site generation
  trailingSlash: true,           // GitHub Pages compatibility
  images: { unoptimized: true }, // Static export requirement
  basePath: isGithubPages ? '/About' : '',
  assetPrefix: isGithubPages ? '/About/' : '',
};
```

### TypeScript Configuration (`tsconfig.json`)
- **Strict Mode**: Enhanced type checking
- **Path Mapping**: `@/*` alias for src directory
- **Next.js Plugin**: Integrated TypeScript support
- **Modern Target**: ES2017 for optimal browser support

### Tailwind Configuration (`tailwind.config.ts`)
- **Custom Animations**: Extended animation utilities
- **Color Palette**: Consistent design system colors
- **Responsive Design**: Mobile-first breakpoints
- **Plugin Integration**: Additional Tailwind plugins

## Deployment Architecture

### GitHub Actions Workflow
```yaml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main", "master"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build:github
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

### Static Hosting Optimization
- **Asset Prefix**: Proper URL handling for subdirectory hosting
- **Trailing Slash**: Consistent URL structure
- **No Jekyll**: `.nojekyll` file prevents Jekyll processing
- **MIME Types**: Proper content type handling

## Security Considerations

- **No Runtime Dependencies**: Static export eliminates server vulnerabilities
- **Content Security Policy**: Can be implemented at hosting level
- **HTTPS**: GitHub Pages provides automatic HTTPS
- **No Sensitive Data**: All code is public (portfolio nature)