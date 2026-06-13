# ACME Bio Engineering Website Preview

Interactive one-page preview for Shandong ACME Bio-engineering.

## Preview Locally

Run a static server from the project folder:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173/
```

## Deploy Preview

This prototype is currently a static site:

- `index.html`
- `styles.css`
- `src/main.js`
- `assets/`

It can be deployed to Vercel, Netlify, or Cloudflare Pages as a static project.

### Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Use default static-site settings.
4. No build command is required.

### Netlify

1. Push this folder to a GitHub repository.
2. Import the repository in Netlify.
3. Leave build command empty.
4. Set publish directory to `.`.

## Notes

The prototype uses React and Motion through browser ESM imports for fast previewing. For a production handoff, migrate to a Vite or Next.js build.

