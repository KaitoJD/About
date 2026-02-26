# Deployment

## GitHub Pages (Default)

Push to `master` — GitHub Actions builds and deploys automatically.

The workflow is in `.github/workflows/nextjs.yml`.

### Manual Deploy

```bash
npm run build:github
# Upload the 'out/' directory to your hosting
```

## Alternatives

**Vercel:**
```bash
npm i -g vercel && vercel --prod
```

**Netlify:** Run `npm run build:github`, then upload `out/` to Netlify.

**Any static host:** Upload the `out/` directory.

## Configuration

GitHub Pages settings are in `next.config.ts`:

```typescript
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? '/About' : '',
  assetPrefix: isGithubPages ? '/About/' : '',
};
```

Update `basePath` and `assetPrefix` if your repository name differs.