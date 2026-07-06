<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import { PROJECT_NAME } from '$lib/scripts/project.ts';
	import Button from '$lib/components/Button.svelte';
</script>

<style>
	.hero {
		text-align: center;
		padding: 6rem 2rem 4rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 4rem;
		font-weight: 700;
		letter-spacing: 2px;
		margin-bottom: 0.5rem;
	}

	.hero-subtitle {
		font-size: 1.4rem;
		color: var(--text);
		margin-bottom: 1rem;
		font-weight: 300;
	}

	.hero-desc {
		font-size: 1.05rem;
		color: var(--text-muted);
		max-width: 600px;
		margin: 0 auto 2rem;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>

<div class="hero">
	<h1 class="hero-title">{PROJECT_NAME}</h1>
	<p class="hero-subtitle">{$t('hero.subtitle')}</p>
	<p class="hero-desc">{$t('hero.description')}</p>
	<div class="hero-actions">
		<Button href="#download" icon="/icons/download.svg">{$t('hero.download')}</Button>
	</div>
</div>
