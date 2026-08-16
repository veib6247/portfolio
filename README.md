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

## Production URL

Set `PUBLIC_SITE_URL` to the deployed origin during the production build. Astro uses it for canonical, Open Graph, and social-image URLs.

```sh
PUBLIC_SITE_URL=https://example.com bun run build
```

Do not set a placeholder domain in production.
