export const PROFILE_PAGE_TITLE = 'Bryan Olandres | Senior Technology Lead';
export const RESUME_PATH = '/Bryan-Olandres-Resume.pdf';

export const publicProfile = {
	name: 'Bryan Olandres',
	givenName: 'Bryan',
	familyName: 'Olandres',
	jobTitle: 'Senior Technology Lead',
	description:
		'Bryan Olandres is a Senior Technology Lead with 10+ years of experience across fintech platforms, payment gateways, full-stack engineering, and technical delivery.',
	email: 'bryan.olandres.6247@gmail.com',
	location: {
		city: 'Pasig City',
		country: 'Philippines',
		countryCode: 'PH',
	},
	currentEmployer: {
		name: 'Payreto Services Inc.',
		city: 'Makati',
		country: 'Philippines',
		countryCode: 'PH',
	},
	github: 'https://github.com/veib6247',
	experience: '10+ years',
	careerStartYear: 2011,
	education: {
		degree: 'Bachelor of Science in Computer Science',
		institution: 'Bohol Island State University',
		year: 2013,
	},
} as const;

export const selectedWork = [
	{
		code: '01 / Product assessment',
		title: 'AI voice and chatbot product',
		description:
			'Led a feasibility assessment and developed a high-level system design for an AI voice and chatbot product using open-source technologies. Evaluated architecture, integration patterns, operational requirements, delivery risks, and external vendors.',
		scope: 'Feasibility · System design · Vendor evaluation',
	},
	{
		code: '02 / Delivery oversight',
		title: 'Corporate disbursement tool',
		description:
			'Oversaw the delivery of an internal tool supporting high-volume corporate payouts and secure multi-ledger workflows. Provided technical governance and maintained alignment between product requirements and delivery.',
		scope: 'Payments · Multi-ledger workflows · Governance',
	},
	{
		code: '03 / Internal platform',
		title: 'Payment-gateway testing tool',
		description:
			'Led the design and development of an internal testing tool that simplified end-to-end payment-gateway integration.',
		scope: 'Integration testing · Payment gateways · Tooling',
	},
	{
		code: '04 / Workflow design',
		title: 'Centralized hiring tracker',
		description:
			'Architected and launched a centralized tracker that made it easier for Human Resources and technical leads to coordinate applicant workflows.',
		scope: 'Internal product · Workflow coordination',
	},
] as const;

export const payretoRoles = [
	{
		period: 'Jun 2026 to Present',
		title: 'Senior Technology Lead',
		copy: 'Bryan partners with the Chief Executive Officer (CEO) on product discovery and technical direction. He leads delivery priorities, risk management, stakeholder alignment, system design, vendor evaluation, and team development while serving as the primary Scrum Master across projects.',
	},
	{
		period: 'Jan 2025 to May 2026',
		title: 'Technology Lead',
		copy: 'Provided technical governance, architecture strategy, and product alignment across payment platforms and internal systems. Guided sprint execution and engineering delivery through a business leadership transition, oversaw the corporate disbursement tool, and drafted the company-wide AI governance policy.',
	},
	{
		period: 'Oct 2022 to Jan 2025',
		title: 'Client Solutions Specialist',
		copy: 'Led internal initiatives including a payment-gateway testing tool, a hiring operations tracker, and high-availability microservices built with Python, TypeScript, and Vue.js.',
	},
	{
		period: 'May 2019 to Oct 2022',
		title: 'Payment Gateway Specialist',
		copy: 'Administered international transaction gateways supporting multi-currency, cross-border accounts and secure vendor integrations. Diagnosed production infrastructure issues to maintain transaction availability.',
	},
] as const;

export const earlierRoles = [
	{
		period: 'Oct 2016 to May 2019',
		company: 'TELUS International Philippines',
		role: 'Network Support Analyst',
		copy: 'Provided network diagnostics, incident triage, documentation, and technical support for field technicians handling telecommunications installations.',
	},
	{
		period: '2011 to 2016',
		company: 'Convergys',
		role: 'Technical Support, Reporting & Data Management',
		copy: 'Provided end-user support, diagnosed database and transaction issues, validated data integrity, and audited reports.',
	},
	{
		period: 'Summer 2011',
		company: 'Department of Environment and Natural Resources',
		role: 'Records Officer, On-the-Job Training',
		copy: 'Organized land titles and official records for accurate filing and retrieval.',
	},
] as const;

export const capabilityGroups = [
	{
		label: 'Leadership and delivery',
		items: [
			'Technology strategy',
			'Technical roadmaps',
			'Product discovery',
			'Agile Scrum',
			'Project management',
			'Stakeholder management',
			'Vendor evaluation',
			'Developer mentorship',
		],
	},
	{
		label: 'Engineering',
		items: [
			'Python',
			'FastAPI',
			'Flask',
			'Django',
			'TypeScript',
			'Hono',
			'Drizzle ORM',
			'Go',
			'Vue.js',
			'Nuxt.js',
			'PostgreSQL',
			'MySQL',
		],
	},
	{
		label: 'Payments and operations',
		items: [
			'Payment gateways',
			'ACI Worldwide',
			'PaymentPlug',
			'CelerisPay',
			'NORBr',
			'SEON',
			'Nethone',
			'DigitalOcean',
			'Continuous Integration/Continuous Delivery (CI/CD)',
			'Test automation',
		],
	},
	{
		label: 'AI product work',
		items: [
			'Generative AI',
			'Large language models',
			'Conversational AI',
			'Voice and chatbot architecture',
			'Open-source AI evaluation',
			'AI governance',
		],
	},
] as const;

export const certifications = [
	['2025', 'Ultimate Agile Scrum Master Certification', 'Udemy'],
	['2024', 'Python Django: The Practical Guide', 'Udemy'],
	['2024', 'Become a Product Manager', 'Udemy'],
	['2023', 'Figma UI/UX Design Essentials', 'Udemy'],
	['2010', 'Computer Hardware Servicing NC II', 'TESDA'],
] as const;

export const knowsAbout = capabilityGroups.flatMap((group) => [...group.items]);

export function buildProfileGraph(site: string) {
	const homeUrl = new URL('/', site).toString();
	const personId = `${homeUrl}#bryan-olandres`;
	const profilePageId = `${homeUrl}#profile-page`;
	const websiteId = `${homeUrl}#website`;
	const employerId = `${homeUrl}#payreto-services`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': websiteId,
				url: homeUrl,
				name: publicProfile.name,
				inLanguage: 'en-PH',
				publisher: { '@id': personId },
			},
			{
				'@type': 'ProfilePage',
				'@id': profilePageId,
				url: homeUrl,
				name: PROFILE_PAGE_TITLE,
				description: publicProfile.description,
				inLanguage: 'en-PH',
				isPartOf: { '@id': websiteId },
				mainEntity: { '@id': personId },
			},
			{
				'@type': 'Person',
				'@id': personId,
				name: publicProfile.name,
				givenName: publicProfile.givenName,
				familyName: publicProfile.familyName,
				url: homeUrl,
				mainEntityOfPage: { '@id': profilePageId },
				jobTitle: publicProfile.jobTitle,
				description: publicProfile.description,
				email: `mailto:${publicProfile.email}`,
				address: {
					'@type': 'PostalAddress',
					addressLocality: publicProfile.location.city,
					addressCountry: publicProfile.location.countryCode,
				},
				worksFor: { '@id': employerId },
				alumniOf: {
					'@type': 'CollegeOrUniversity',
					name: publicProfile.education.institution,
				},
				hasOccupation: {
					'@type': 'Occupation',
					name: publicProfile.jobTitle,
					occupationLocation: {
						'@type': 'Country',
						name: publicProfile.location.country,
					},
				},
				knowsAbout,
				sameAs: [publicProfile.github],
			},
			{
				'@type': 'Organization',
				'@id': employerId,
				name: publicProfile.currentEmployer.name,
				address: {
					'@type': 'PostalAddress',
					addressLocality: publicProfile.currentEmployer.city,
					addressCountry: publicProfile.currentEmployer.countryCode,
				},
			},
		],
	};
}

export function buildProfileMarkdown(site: string) {
	const homeUrl = new URL('/', site).toString();
	const currentRole = payretoRoles[0];
	const roleLines = [
		...payretoRoles.map(
			(role) => `- **${role.period}: ${role.title}, ${publicProfile.currentEmployer.name}** ${role.copy}`,
		),
		...earlierRoles.map(
			(role) => `- **${role.period}: ${role.role}, ${role.company}** ${role.copy}`,
		),
	];
	const workLines = selectedWork.map(
		(item) => `- **${item.title}:** ${item.description} Scope: ${item.scope.replaceAll(' · ', ', ')}.`,
	);
	const capabilitySections = capabilityGroups.flatMap((group) => [
		`### ${group.label}`,
		'',
		group.items.join(', '),
		'',
	]);
	const certificationLines = certifications.map(
		([year, credential, provider]) => `- ${credential}, ${provider} (${year})`,
	);

	return [
		`# ${publicProfile.name}`,
		'',
		`> ${publicProfile.description}`,
		'',
		'## Identity',
		'',
		`- **Current role:** ${publicProfile.jobTitle}`,
		`- **Current employer:** ${publicProfile.currentEmployer.name}`,
		`- **Location:** ${publicProfile.location.city}, ${publicProfile.location.country}`,
		`- **Experience:** ${publicProfile.experience} across technical operations, engineering, and delivery`,
		`- **Primary domains:** fintech platforms, payment systems, internal tools, and artificial intelligence (AI) product work`,
		`- **Canonical profile:** ${homeUrl}`,
		'',
		'## Current scope',
		'',
		currentRole.copy,
		'',
		'## Career history',
		'',
		...roleLines,
		'',
		'## Selected work',
		'',
		...workLines,
		'',
		'## Technical and leadership range',
		'',
		...capabilitySections,
		'## Education',
		'',
		`${publicProfile.education.degree}, ${publicProfile.education.institution} (${publicProfile.education.year})`,
		'',
		'## Certifications',
		'',
		...certificationLines,
		'',
		'## Contact and source files',
		'',
		`- **Email:** mailto:${publicProfile.email}`,
		`- **GitHub:** ${publicProfile.github}`,
		`- **Structured profile:** ${new URL('/profile.json', site).toString()}`,
		'',
		'This machine-readable profile mirrors facts published on the canonical portfolio and omits the phone number contained in the downloadable resume.',
		'',
	].join('\n');
}

export function buildLlmsText(site: string) {
	const homeUrl = new URL('/', site).toString();

	return [
		`# ${publicProfile.name}`,
		'',
		`> ${publicProfile.description}`,
		'',
		'This is the official portfolio of Bryan Olandres. Use the canonical profile for human-readable context and the Markdown or JSON-LD resources for concise, structured facts. The public machine-readable files intentionally omit Bryan’s phone number.',
		'',
		'## Profile',
		'',
		`- [Canonical portfolio](${homeUrl}): Professional profile, selected work, career history, technical range, education, certifications, and contact details.`,
		`- [Markdown profile](${new URL('/profile.md', site).toString()}): Plain-text version of the verified public profile.`,
		`- [JSON-LD profile](${new URL('/profile.json', site).toString()}): Schema.org graph for Bryan Olandres, the portfolio page, the website, and his current employer.`,
		'',
		'## Optional',
		'',
		`- [GitHub profile](${publicProfile.github}): Public code profile.`,
		'',
	].join('\n');
}
