# Customization

## Personal Info

Edit `src/data/personal.ts`:

```typescript
export const fullText = "Your Name Here";
export const descriptionText = "Your description here...";
export const highlightedName = "Your Name Here";
export const highlightedPhrase = "your highlighted phrase";
export const discordUsername = "your_discord_username";
export const emailAddress = "your.email@domain.com";
```

## Tech Stack

Edit `src/data/techStack.ts` to add/remove technologies:

```typescript
export const techStack: TechItem[] = [
  { name: "React", icon: FaReact, color: "#61DAFB", category: "Frontend" },
  // Categories: "Language", "Frontend", "Backend", "Tools"
];

export const techCategories = ['All', 'Language', 'Frontend', 'Backend', 'Tools'];
```

## Skills & Traits

Edit `src/data/skills.ts` to update skill ratings, personal traits, currently-learning items, and fun facts.

## Timeline

Edit `src/data/timeline.ts` to add/remove/reorder timeline entries.

## Contact Cards

Edit `src/data/contacts.ts` to update professional and personal contact information.

## Navigation

Edit `src/data/navigation.ts` to add or rename navigation items.

## Colors & Theme

Edit CSS variables in `src/styles/base.css`:

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