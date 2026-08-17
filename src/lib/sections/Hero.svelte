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

	.hero-logo {
		width: 100%;
		max-width: 240px;
		height: auto;
		margin: 0 auto 1.5rem;
		display: block;
	}

	.hero-title {
		font-size: 4rem;
		font-weight: 700;
		letter-spacing: 2px;
		margin-bottom: 0.5rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	/* Blinking terminal block cursor after the title. */
	.hero-title::after {
		content: '';
		width: 0.55em;
		height: 1em;
		background: var(--foreground);
		animation: cursor-blink 1.2s steps(1) infinite;
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

	@media (--mobile) {
		.hero-logo {
			max-width: 120px;
			margin-bottom: 1rem;
		}

		.hero-title {
			font-size: 2rem;
		}
	}
</style>

<div class="hero">
	<img class="hero-logo" src="/icons/logo-yellow.svg" alt={PROJECT_NAME} draggable="false" />
	<h1 class="hero-title">{PROJECT_NAME}</h1>
	<p class="hero-subtitle">{$t('hero.subtitle')}</p>
	<p class="hero-desc">{$t('hero.description')}</p>
	<div class="hero-actions">
		<Button href="#download" icon="/icons/download.svg">{$t('hero.download')}</Button>
	</div>
</div>
