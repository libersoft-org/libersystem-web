<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import { PROJECT_NAME, PROJECT_REPO_URL } from '$lib/scripts/project.ts';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<style>
	.section-desc {
		text-align: center;
		color: var(--text-muted);
		margin-bottom: 3rem;
		font-size: 1.05rem;
	}

	.download-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>

<Section id="download" title={$t('download.title')}>
	<div class="section-desc">{$t('download.description', { project: PROJECT_NAME })}</div>
	<div class="download-actions">
		<Button href="{PROJECT_REPO_URL}/releases" icon="/icons/download.svg">{$t('download.image')}</Button>
		<Button href={PROJECT_REPO_URL} icon="/icons/github.svg">{$t('download.sourceCode')}</Button>
	</div>
</Section>
