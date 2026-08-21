import type { APIRoute } from 'astro';
import { buildProfileMarkdown } from '../data/profile';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Astro site URL is required to generate profile.md.');
	const origin = site.toString();

	return new Response(buildProfileMarkdown(origin), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
			Link: `<${new URL('/', origin).toString()}>; rel="canonical"`,
		},
	});
};
