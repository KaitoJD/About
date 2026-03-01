# Architecture

## Project Structure

```
About/
├── .github/workflows/nextjs.yml   # CI/CD pipeline
├── docs/                          # Documentation
├── public/                        # Static assets (favicon, SVGs)
├── src/
│   ├── app/
│   │   ├── globals.css            # Tailwind import + style imports
│   │   ├── layout.tsx             # Root layout & metadata
│   │   └── page.tsx               # Page orchestrator (hooks + sections)
│   ├── components/
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx   # About / skills / tech stack section
│   │   │   ├── ContactSection.tsx # Contact cards & CTA section
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   ├── HeroSection.tsx    # Hero with typing animation
│   │   │   └── TimelineSection.tsx# Journey timeline section
│   │   ├── ui/
│   │   │   ├── ContactCard.tsx    # Reusable contact card
│   │   │   ├── CopyNotification.tsx # Clipboard toast notification
│   │   │   ├── InteractionOverlay.tsx # Blocks input during intro
│   │   │   ├── Navbar.tsx         # Fixed navigation bar
│   │   │   ├── SkillDots.tsx      # Skill rating dot indicator
│   │   │   └── TimelineItem.tsx   # Single timeline entry
│   │   └── TechStackDynamic.tsx   # Filterable tech icon grid
│   ├── data/
│   │   ├── contacts.ts           # Contact card definitions
│   │   ├── navigation.ts         # Nav items
│   │   ├── personal.ts           # Name, bio, notification timing
│   │   ├── skills.ts             # Skill ratings, traits, learning, fun facts
│   │   ├── techStack.ts          # Tech stack items & categories
│   │   └── timeline.ts           # Timeline entries
│   ├── hooks/
│   │   ├── useAnimationSequence.ts # Header → back-button → complete cascade
│   │   ├── useCopyToClipboard.ts   # Discord copy + notification lifecycle
│   │   ├── useInteractionBlocker.ts# Blocks interaction during intro
│   │   ├── useManagedTimeouts.ts   # Shared timeout manager with cleanup
│   │   ├── useMobileMenu.ts       # Mobile hamburger menu state
│   │   └── useTypingAnimation.ts   # Hero typing effect state machine
│   ├── styles/
│   │   ├── animations.css         # @keyframes & animation utility classes
│   │   ├── base.css               # CSS variables, body defaults, scrollbar hiding
│   │   └── components.css         # Component-specific styles
│   ├── types/
│   │   └── index.ts               # Shared TypeScript interfaces
│   └── utils/
│       ├── scrollToSection.ts     # Smooth scroll helper
│       └── typingSpeed.ts         # Random typing speed generator
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Component Hierarchy

```
page.tsx (orchestrator)
├── CopyNotification
├── InteractionOverlay
├── Navbar
├── HeroSection
├── AboutSection
│   ├── SkillDots
│   └── TechStackDynamic
├── TimelineSection
│   └── TimelineItem (×6)
├── ContactSection
│   └── ContactCard (×6)
└── Footer
```

## Data Flow

- **`page.tsx`** calls custom hooks (`useTypingAnimation`, `useAnimationSequence`, etc.) and passes state down as props to section/UI components.
- **Data files** in `src/data/` export plain arrays/objects consumed by components.
- **No global state management** — all state is local via hooks, threaded through props.

## Animations

1. Typing effect for hero title & description (`useTypingAnimation`)
2. Staged entrance: buttons → header → back-button → complete (`useAnimationSequence`)
3. Interaction blocking during intro (`useInteractionBlocker`)
4. Hover effects & mobile menu transitions (CSS + `useMobileMenu`)

## Key Config

- **Static export** via `output: 'export'` in `next.config.ts`
- **GitHub Pages** paths handled with `basePath` / `assetPrefix`
- **Tailwind CSS v4** configured through PostCSS
- **TypeScript** strict mode with `@/*` path alias mapping to `./src/*`