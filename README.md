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
```

The production build is written to `dist/`.

## Resume download

The recruiter-facing PDF is stored at:

```text
public/Bryan-Olandres-Resume.pdf
```

Keep the filename stable when replacing the resume. The navigation, hero, and contact section all reference this path.

## Deployment

Vercel deploys the production site at `https://www.bryisdoinghisbest.com` and uses the `staging` branch for preview deployments.

The production origin is configured through Astro's `site` setting so canonical and Open Graph URLs remain stable on Vercel previews. `PUBLIC_SITE_URL` can override that origin for an intentional alternate deployment.
