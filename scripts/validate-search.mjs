import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const productionOrigin = 'https://www.bryisdoinghisbest.com';
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const readBinary = (path) => readFile(new URL(`../${path}`, import.meta.url));
const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const expectedResumeHash = '8b49bb1c2ff354d12d4cf42b7d0219798797542decce015c933cd0db7d7fe35d';
const expectedSocialCardHash = '85053642c57449916fd25c53cd622344f92caf2579b7bb89a83bc45b71242980';
const isPreviewBuild = process.env.VERCEL_ENV === 'preview';

const [
	html,
	profileJson,
	profileMarkdown,
	llmsText,
	robotsText,
	sitemapIndex,
	sitemap,
	vercelConfigText,
	publicResume,
	builtResume,
	socialCard,
] = await Promise.all([
		read('dist/index.html'),
		read('dist/profile.json'),
		read('dist/profile.md'),
		read('dist/llms.txt'),
		read('dist/robots.txt'),
		read('dist/sitemap-index.xml'),
		read('dist/sitemap-0.xml'),
		read('vercel.json'),
		readBinary('public/Bryan-Olandres-Resume.pdf'),
		readBinary('dist/Bryan-Olandres-Resume.pdf'),
		readBinary('public/og-card.png'),
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
const expectedRobotDirectives = isPreviewBuild
	? 'noindex, nofollow, nosnippet'
	: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
for (const agent of ['robots', 'googlebot', 'bingbot']) {
	assert(
		html.includes(`name="${agent}" content="${expectedRobotDirectives}"`),
		`${agent} metadata does not match the ${isPreviewBuild ? 'preview' : 'production'} policy.`,
	);
}

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
assert(
	!publiclyExtractableText.includes('Interim Senior Technology Lead'),
	'Retired current-title wording leaked into public site content.',
);
for (const entry of [
	'Jun 2026 to Present: Senior Technology Lead, Payreto Services Inc.',
	'Jan 2025 to May 2026: Technology Lead, Payreto Services Inc.',
	'Oct 2022 to Jan 2025: Client Solutions Specialist, Payreto Services Inc.',
	'May 2019 to Oct 2022: Payment Gateway Specialist, Payreto Services Inc.',
]) {
	assert(profileMarkdown.includes(entry), `Career history is missing the approved entry: ${entry}`);
}
assert(!publiclyExtractableText.includes('912 154 5913'), 'Phone number leaked outside the downloadable resume.');
assert(!publiclyExtractableText.includes('(+63)'), 'Phone number leaked outside the downloadable resume.');

assert.equal(sha256(publicResume), expectedResumeHash, 'Public resume bytes changed.');
assert.equal(sha256(builtResume), expectedResumeHash, 'Built resume bytes changed.');
assert.equal(sha256(socialCard), expectedSocialCardHash, 'Open Graph card changed without title verification.');
assert.equal(socialCard.readUInt32BE(16), 1200, 'Open Graph card width must remain 1200px.');
assert.equal(socialCard.readUInt32BE(20), 630, 'Open Graph card height must remain 630px.');

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

console.log(
	`Search verification passed for ${isPreviewBuild ? 'preview' : 'production'}: metadata, structured data, crawler policy, assets, sitemap, and machine-readable profiles are consistent.`,
);
