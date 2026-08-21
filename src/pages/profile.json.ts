import type { APIRoute } from 'astro';
import { buildProfileGraph } from '../data/profile';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Astro site URL is required to generate profile.json.');
	const origin = site.toString();

	return new Response(`${JSON.stringify(buildProfileGraph(origin), null, 2)}\n`, {
		headers: {
			'Content-Type': 'application/ld+json; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
			Link: `<${new URL('/', origin).toString()}>; rel="canonical"`,
		},
	});
};
