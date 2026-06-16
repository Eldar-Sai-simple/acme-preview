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

This prototype is currently a self-contained static site:

- `index.html`
- `styles.css`
- `src/main.js`
- `assets/`

It can be deployed to Vercel, Netlify, Cloudflare Pages, Alibaba Cloud Hong Kong, Tencent Cloud Hong Kong, or any simple static hosting.

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

React, React DOM, Scheduler and Motion are vendored under `assets/vendor/`, so the browser does not need to load JavaScript from an external CDN at runtime. This makes the preview more suitable for China-facing review links.

For mainland China production hosting, use an ICP-compliant mainland setup. For a fast client preview without ICP, host this static folder in Hong Kong and avoid adding blocked third-party scripts, fonts, analytics or embeds.
