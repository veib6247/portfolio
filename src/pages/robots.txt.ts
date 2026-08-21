import type { APIRoute } from 'astro';

export const prerender = true;

const searchAgents = [
	'OAI-SearchBot',
	'ChatGPT-User',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
];

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Astro site URL is required to generate robots.txt.');
	const origin = site.toString();
	const groups = searchAgents.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']);
	const body = [
		...groups,
		'User-agent: *',
		'Allow: /',
		'',
		`Sitemap: ${new URL('/sitemap-index.xml', origin).toString()}`,
		'',
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
		},
	});
};
