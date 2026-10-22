# Abdul Rahman — Portfolio

Dark, glowing portfolio built with [Astro](https://astro.build) (static HTML, almost no JavaScript) + Lenis smooth scroll.

## Edit content
Everything you'll change lives in **`src/data/site.js`**: links, stats, projects, experience, tools.

- Photo: add `public/me.webp`, then in `src/pages/index.astro` replace the `<span>Your photo</span>` with `<img src="/me.webp" alt="Abdul Rahman Mohammad" />`.
- CV: put your PDF at `public/cv.pdf`.
- Project images live in `public/work/`.
- New case study page: copy `src/pages/work/mushaf-eqraa.astro`, rename it, and point the project's `href` to it.

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs the static site to /dist
```

## Put it online (free)
1. Create a GitHub account → **New repository** → name it `portfolio`.
2. Upload this folder (drag & drop on GitHub, or `git push`). Don't upload `node_modules` or `dist`.
3. Go to **vercel.com** → sign in with GitHub → **Add New → Project** → pick `portfolio` → **Deploy**.
   Vercel detects Astro automatically. You get a link like `portfolio-xyz.vercel.app` (rename it in Settings → Domains).
4. Every time you push a change to GitHub, the site updates by itself.
5. Optional: buy a domain (~$10–15/yr) and add it in Vercel → Settings → Domains.

After deploying, set your real address in `astro.config.mjs` (`site:`).
