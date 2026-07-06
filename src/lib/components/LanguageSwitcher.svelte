<script lang="ts">
	import { onMount } from 'svelte';
	import { currentLanguage, languages, getFlagURL, openLanguageDialog, t } from '../scripts/language.ts';
	interface Props {
		onOpen?: () => void;
	}
	let { onOpen }: Props = $props();
	let mounted = $state(false);
	let currentLang = $derived(languages.find(l => l.id === $currentLanguage));

	onMount(() => {
		mounted = true;
	});

	function handleOpen(): void {
		onOpen?.();
		openLanguageDialog();
	}

	function handleClick(): void {
		handleOpen();
	}

	function handleKey(e: KeyboardEvent): void {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		handleOpen();
	}
</script>

<style>
	.trigger {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem;
		border-radius: 6px;
		cursor: pointer;
		border: 1px solid var(--border);
		background: var(--background-light);
		transition:
			border-color 0.2s,
			background 0.2s;
	}

	.trigger:hover {
		border-color: var(--border-hover);
		background: var(--hover-bg);
	}

	.flag {
		width: 28px;
		height: 20px;
		border-radius: 3px;
		overflow: hidden;
		display: inline-flex;
		flex: none;
	}

	.flag img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}
</style>

<div class="trigger" role="button" tabindex="0" aria-label={$t('menu.selectLanguage')} aria-haspopup="dialog" title={currentLang?.nativeLabel ?? ''} onclick={handleClick} onkeydown={handleKey}>
	{#if mounted && currentLang}
		<span class="flag"><img src={getFlagURL(currentLang.id)} alt={currentLang.nativeLabel} draggable="false" /></span>
	{:else}
		<span class="flag"></span>
	{/if}
</div>
