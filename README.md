# Bryan Olandres portfolio

A static Astro portfolio for Bryan Olandres, focused on technology leadership, fintech, payment systems, and engineering delivery.

## Development

Requires Node.js 22.12 or newer and Bun.

```sh
bun install
bun run dev
```

The repository guidance uses Astro's background server mode when the development server should stay running:

```sh
bunx astro dev --background
bunx astro dev status
bunx astro dev logs
bunx astro dev stop
```

## Quality checks

```sh
bun run check
bun run build
bun run verify:search
```

The production build is written to `dist/`.

`bun run verify:search` validates both production and Vercel preview metadata, restores a production build, and checks the structured-data graph, crawler policy, sitemap, machine-readable routes, resume checksum, and Open Graph card.

## Resume download

The recruiter-facing PDF is stored at:

```text
public/Bryan-Olandres-Resume.pdf
```

Keep the filename stable when replacing the resume. The navigation, hero, and contact section all reference this path.

## Deployment

Vercel deploys the production site at `https://www.bryisdoinghisbest.com` and uses the `staging` branch for preview deployments.

The production origin is configured through Astro's `site` setting so canonical, Open Graph, sitemap, robots, and structured-data URLs remain stable on Vercel previews.

Vercel adds `X-Robots-Tag: noindex` to preview deployments. The layout also emits preview-safe robots metadata when `VERCEL_ENV=preview`, while production builds remain indexable.

## Search and AI discoverability

The site keeps its public professional facts in `src/data/profile.ts`. The visible portfolio, embedded Schema.org graph, and machine-readable routes use that shared source so names, roles, dates, skills, and URLs do not drift.

Production builds provide:

- `/sitemap-index.xml` and `/sitemap-0.xml` through `@astrojs/sitemap`
- `/robots.txt` with explicit access for OpenAI, Anthropic, and Perplexity search agents
- `/profile.json` with a Schema.org `WebSite`, `ProfilePage`, `Person`, and `Organization` graph
- `/profile.md` with a concise text version of the public profile
- `/llms.txt` as an optional discovery file for agents that support the emerging convention

The HTML document links to the sitemap, JSON-LD profile, Markdown profile, and `llms.txt`. The canonical page remains the primary indexable source. `vercel.json` marks machine-only variants and the downloadable resume PDF as `noindex` so they do not compete with the portfolio as standalone search results. This does not make the public resume private.

`llms.txt` is supplementary. It is not a substitute for crawlable HTML, accurate structured data, a sitemap, or useful first-hand content.
