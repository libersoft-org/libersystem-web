<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import { PROJECT_NAME, PROJECT_REPO_URL } from '$lib/scripts/project.ts';
	import Section from '$lib/components/Section.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import Cards from '$lib/components/Cards.svelte';
	interface Feature {
		icon: string;
		titleKey: string;
		descriptionKey: string;
	}
	const features: Feature[] = [
		{ icon: '/icons/microkernel.svg', titleKey: 'about.features.microkernel.title', descriptionKey: 'about.features.microkernel.description' },
		{ icon: '/icons/security.svg', titleKey: 'about.features.capabilities.title', descriptionKey: 'about.features.capabilities.description' },
		{ icon: '/icons/services.svg', titleKey: 'about.features.services.title', descriptionKey: 'about.features.services.description' },
		{ icon: '/icons/braces.svg', titleKey: 'about.features.contracts.title', descriptionKey: 'about.features.contracts.description' },
		{ icon: '/icons/filesystem.svg', titleKey: 'about.features.liberfs.title', descriptionKey: 'about.features.liberfs.description' },
		{ icon: '/icons/cpu.svg', titleKey: 'about.features.smp.title', descriptionKey: 'about.features.smp.description' },
	];
	let intro = $derived($t('about.intro', { project: PROJECT_NAME }));
	const licenseLabel = 'Unlicense';
	// Split intro around the {license} placeholder so we can render the link tag inline.
	let introParts = $derived.by(() => {
		const parts = intro.split('{license}');
		return { before: parts[0] ?? '', after: parts[1] ?? '' };
	});
</script>

<style>
	.about-intro {
		font-size: 1.1rem;
		text-align: center;
		margin: 0 auto 3rem;
		max-width: 800px;
		line-height: 1.8;
		color: var(--text);
	}
</style>

<Section id="about" title={$t('about.title')}>
	<div class="about-intro">{introParts.before}<a href="{PROJECT_REPO_URL}/blob/main/LICENSE" target="_blank">{licenseLabel}</a>{introParts.after}</div>
	<Cards>
		{#each features as feature}
			<FeatureCard icon={feature.icon} title={$t(feature.titleKey)} description={$t(feature.descriptionKey, { project: PROJECT_NAME })} />
		{/each}
	</Cards>
</Section>
