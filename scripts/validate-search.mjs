import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const productionOrigin = 'https://www.bryisdoinghisbest.com';
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const [html, profileJson, profileMarkdown, llmsText, robotsText, sitemapIndex, sitemap, vercelConfigText] =
	await Promise.all([
		read('dist/index.html'),
		read('dist/profile.json'),
		read('dist/profile.md'),
		read('dist/llms.txt'),
		read('dist/robots.txt'),
		read('dist/sitemap-index.xml'),
		read('dist/sitemap-0.xml'),
		read('vercel.json'),
	]);

const embeddedMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(embeddedMatch, 'The built homepage must contain an application/ld+json script.');

const embeddedGraph = JSON.parse(embeddedMatch[1]);
const endpointGraph = JSON.parse(profileJson);
assert.deepEqual(endpointGraph, embeddedGraph, 'Embedded and standalone JSON-LD graphs must match.');
assert.equal(endpointGraph['@context'], 'https://schema.org');

const nodes = new Map(endpointGraph['@graph'].map((node) => [node['@type'], node]));
for (const type of ['WebSite', 'ProfilePage', 'Person', 'Organization']) {
	assert(nodes.has(type), `Structured data is missing ${type}.`);
}

const profilePage = nodes.get('ProfilePage');
const person = nodes.get('Person');
assert.equal(profilePage.mainEntity['@id'], person['@id']);
assert.equal(person.mainEntityOfPage['@id'], profilePage['@id']);
assert.equal(person.name, 'Bryan Olandres');
assert.equal(person.jobTitle, 'Senior Technology Lead');
assert.equal(person.url, `${productionOrigin}/`);
assert(person.knowsAbout.includes('Payment gateways'));
assert(person.knowsAbout.includes('Generative AI'));

for (const [relation, target] of [
	['canonical', `${productionOrigin}/`],
	['sitemap', `${productionOrigin}/sitemap-index.xml`],
]) {
	assert(
		html.includes(`rel="${relation}" href="${target}"`),
		`Homepage is missing the ${relation} link.`,
	);
}
for (const target of ['/profile.json', '/profile.md', '/llms.txt']) {
	assert(html.includes(`href="${productionOrigin}${target}"`), `Homepage is missing ${target}.`);
}
assert(html.includes('name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"'));

for (const agent of [
	'OAI-SearchBot',
	'ChatGPT-User',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
]) {
	assert(robotsText.includes(`User-agent: ${agent}\nAllow: /`), `robots.txt is missing ${agent}.`);
}
assert(robotsText.includes(`Sitemap: ${productionOrigin}/sitemap-index.xml`));
assert(sitemapIndex.includes(`${productionOrigin}/sitemap-0.xml`));
assert(sitemap.includes(`<loc>${productionOrigin}/</loc>`));
for (const machinePath of ['/profile.json', '/profile.md', '/llms.txt']) {
	assert(!sitemap.includes(machinePath), `${machinePath} must not compete with the canonical page in the sitemap.`);
}

assert(profileMarkdown.startsWith('# Bryan Olandres\n'));
assert(llmsText.startsWith('# Bryan Olandres\n'));
assert(llmsText.includes(`[Markdown profile](${productionOrigin}/profile.md)`));
assert(llmsText.includes(`[JSON-LD profile](${productionOrigin}/profile.json)`));

const publiclyExtractableText = [html, profileJson, profileMarkdown, llmsText].join('\n');
assert(!/\binterim\b/i.test(publiclyExtractableText), 'Interim title leaked into public site content.');
assert(!publiclyExtractableText.includes('912 154 5913'), 'Phone number leaked outside the downloadable resume.');
assert(!publiclyExtractableText.includes('(+63)'), 'Phone number leaked outside the downloadable resume.');

const vercelConfig = JSON.parse(vercelConfigText);
const headerRoutes = new Map(vercelConfig.headers.map((route) => [route.source, route.headers]));
for (const path of ['/profile.json', '/profile.md', '/llms.txt', '/Bryan-Olandres-Resume.pdf']) {
	assert(headerRoutes.has(path), `vercel.json is missing headers for ${path}.`);
	assert(
		headerRoutes.get(path).some((header) => header.key === 'X-Robots-Tag' && header.value.includes('noindex')),
		`${path} must remain out of standalone search results.`,
	);
}
assert(
	headerRoutes
		.get('/profile.json')
		.some((header) => header.key === 'Content-Type' && header.value.startsWith('application/ld+json')),
	'profile.json must use the JSON-LD content type on Vercel.',
);

console.log('Search verification passed: canonical HTML, structured data, crawler policy, sitemap, and machine-readable profiles are consistent.');
