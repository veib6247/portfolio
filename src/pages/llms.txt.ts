import type { APIRoute } from 'astro';
import { buildLlmsText } from '../data/profile';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Astro site URL is required to generate llms.txt.');
	const origin = site.toString();

	return new Response(buildLlmsText(origin), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
			Link: `<${new URL('/', origin).toString()}>; rel="describedby"`,
		},
	});
};
