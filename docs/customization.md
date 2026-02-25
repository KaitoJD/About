# Customization

## Personal Info

Edit `src/app/page.tsx`:

```typescript
const fullText = "Your Name Here";
const descriptionText = "Your description here...";
const discordUsername = "your_discord_username";
const emailAddress = "your.email@domain.com";
```

## Tech Stack

Edit `src/components/TechStackDynamic.tsx` to add/remove technologies:

```typescript
const technologies = [
  { name: "React", icon: FaReact, category: "frontend", color: "text-blue-500" },
  // Categories: "frontend", "backend", "database", "tools", "mobile"
];
```

## Colors & Theme

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #10b981;
}
```

## Metadata & SEO

Edit `src/app/layout.tsx` to update title, description, and Open Graph tags.

## Favicon

Replace `public/favicon.svg` with your own.