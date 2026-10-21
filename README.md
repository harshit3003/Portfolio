# Harshit Gupta — Portfolio

Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · Lenis · next-themes · cmdk

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

## Edit content (no component changes needed)

| What | File |
| --- | --- |
| Name, email, GitHub / LeetCode / CodeChef links, hero copy | `src/data/profile.ts` |
| Projects (incl. **Live Demo** URL) | `src/data/projects.ts` |
| Skills + marquee rows | `src/data/skills.ts` |
| LeetCode / CodeChef counts and profile URLs | `src/data/practice.ts` |
| Education + positions of responsibility | `src/data/journey.ts` |
| Certifications | `src/data/certifications.ts` |
| Design tokens (colours, radii, shadows, easing) | `src/app/globals.css` |

## Replace before deploying

- `public/profile.jpg` — your photo (a cropped version is already included; a styled "HG" monogram shows if the file is missing).
- Search for `TODO` — CodeChef URL and your deployed domain. Until set, those buttons show a "Link coming soon" toast instead of jumping to `#`.
- `siteUrl` in `src/data/profile.ts` — your real domain (used for Open Graph, sitemap, robots).

## Contact form

Currently opens the visitor's mail app (`mailto:`). To use a real backend, add `src/app/api/contact/route.ts` and swap the body of `submitContact` in `src/lib/contact.ts` (instructions are in the comment there).

## Deploy to Vercel

1. Push the repo to GitHub.
2. vercel.com → **Add New… → Project** → import the repo (Framework: Next.js is auto-detected).
3. Deploy. Then add your domain under **Settings → Domains** and update `siteUrl`.

(or: `npm i -g vercel && vercel --prod`)
