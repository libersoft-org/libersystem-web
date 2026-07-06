<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import { PROJECT_NAME, PROJECT_REPO_URL } from '$lib/scripts/project.ts';
	import Section from '$lib/components/Section.svelte';
	import Cards from '$lib/components/Cards.svelte';
	import Icon from '$lib/components/Icon.svelte';
	interface DocLink {
		icon: string;
		titleKey: string;
		descriptionKey: string;
		href: string;
	}
	const docLinks: DocLink[] = [
		{ icon: '/icons/document.svg', titleKey: 'documentation.items.concept.title', descriptionKey: 'documentation.items.concept.description', href: `${PROJECT_REPO_URL}/blob/main/docs/CONCEPT_EN.md` },
		{ icon: '/icons/security.svg', titleKey: 'documentation.items.threatModel.title', descriptionKey: 'documentation.items.threatModel.description', href: `${PROJECT_REPO_URL}/blob/main/docs/THREAT_MODEL.md` },
		{ icon: '/icons/braces.svg', titleKey: 'documentation.items.lsidl.title', descriptionKey: 'documentation.items.lsidl.description', href: `${PROJECT_REPO_URL}/blob/main/docs/LSIDL.md` },
		{ icon: '/icons/interface.svg', titleKey: 'documentation.items.systemInterfaces.title', descriptionKey: 'documentation.items.systemInterfaces.description', href: `${PROJECT_REPO_URL}/blob/main/docs/gen/system.md` },
		{ icon: '/icons/filesystem.svg', titleKey: 'documentation.items.liberfs.title', descriptionKey: 'documentation.items.liberfs.description', href: `${PROJECT_REPO_URL}/blob/main/docs/LIBERFS.md` },
		{ icon: '/icons/debug.svg', titleKey: 'documentation.items.debugging.title', descriptionKey: 'documentation.items.debugging.description', href: `${PROJECT_REPO_URL}/blob/main/docs/DEBUG.md` },
		{ icon: '/icons/download.svg', titleKey: 'documentation.items.installation.title', descriptionKey: 'documentation.items.installation.description', href: `${PROJECT_REPO_URL}/blob/main/INSTALL.md` },
		{ icon: '/icons/github.svg', titleKey: 'documentation.items.repository.title', descriptionKey: 'documentation.items.repository.description', href: PROJECT_REPO_URL },
	];
</script>

<style>
	.section-desc {
		text-align: center;
		color: var(--text-muted);
		margin: 0 auto 3rem;
		font-size: 1.05rem;
		max-width: 800px;
	}

	/* Same panel language as Card: sharp corners + yellow corner brackets. */
	.doc-card {
		position: relative;
		display: block;
		background: var(--background);
		border: 1px solid var(--border);
		padding: 2rem;
		color: inherit;
		transition:
			border-color 0.2s,
			transform 0.2s;
	}

	.doc-card::before,
	.doc-card::after {
		content: '';
		position: absolute;
		width: 14px;
		height: 14px;
		pointer-events: none;
	}

	.doc-card::before {
		top: -1px;
		left: -1px;
		border-top: 2px solid var(--foreground);
		border-left: 2px solid var(--foreground);
	}

	.doc-card::after {
		bottom: -1px;
		right: -1px;
		border-bottom: 2px solid var(--foreground);
		border-right: 2px solid var(--foreground);
	}

	.doc-card:hover {
		border-color: var(--border-hover);
		transform: translateY(-3px);
		opacity: 1;
	}

	.doc-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	h3 {
		font-size: 1.4rem;
		color: var(--foreground);
		margin: 0;
	}

	p {
		color: var(--text-muted);
		font-size: 0.95rem;
		line-height: 1.7;
		margin: 0;
		text-align: justify;
	}
</style>

<Section id="documentation" title={$t('documentation.title')}>
	<div class="section-desc">{$t('documentation.description')}</div>
	<Cards>
		{#each docLinks as doc}
			<a class="doc-card" href={doc.href} target="_blank" rel="noopener noreferrer">
				<div class="doc-header">
					<Icon img={doc.icon} alt={$t(doc.titleKey)} size="32px" colorVariable="--foreground" />
					<h3>{$t(doc.titleKey)}</h3>
				</div>
				<p>{$t(doc.descriptionKey, { project: PROJECT_NAME })}</p>
			</a>
		{/each}
	</Cards>
</Section>
