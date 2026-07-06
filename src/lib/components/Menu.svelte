<script lang="ts">
	import { onMount } from 'svelte';
	import { t, currentLanguage, languages, getFlagURL, openLanguageDialog } from '$lib/scripts/language.ts';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import MenuItem from './MenuItem.svelte';
	interface NavItem {
		labelKey: string;
		href: string;
		id: string;
	}
	interface Props {
		navItems: NavItem[];
		activeSection: string;
		open: boolean;
		onClose: () => void;
	}
	let { navItems, activeSection, open, onClose }: Props = $props();
	let mounted = $state(false);
	let currentLang = $derived(languages.find(l => l.id === $currentLanguage));

	onMount(() => {
		mounted = true;
	});

	function handleMobileLangOpen(): void {
		onClose();
		openLanguageDialog();
	}
</script>

<style>
	nav {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.lang {
		display: flex;
		align-items: center;
	}

	.lang-mobile {
		display: none;
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

	@media (--mobile) {
		nav {
			position: fixed;
			top: 65px;
			right: 0;
			width: 250px;
			height: calc(100vh - 65px);
			background: var(--background);
			border-left: 1px solid var(--border);
			box-shadow: var(--shadow);
			flex-direction: column;
			align-items: stretch;
			padding: 0;
			gap: 0;
			transform: translateX(100%);
			transition: transform 0.3s ease;
			z-index: 100;
		}

		nav.open {
			transform: translateX(0);
		}

		.lang {
			display: none;
		}

		.lang-mobile {
			display: block;
			order: -1;
		}
	}
</style>

<nav class:open>
	<div class="lang-mobile">
		<MenuItem ariaLabel={$t('menu.selectLanguage')} ariaHaspopup="dialog" onActivate={handleMobileLangOpen}>
			{$t('menu.language')}
			{#snippet trailing()}
				{#if mounted && currentLang}
					<span class="flag"><img src={getFlagURL(currentLang.id)} alt={currentLang.nativeLabel} draggable="false" /></span>
				{:else}
					<span class="flag"></span>
				{/if}
			{/snippet}
		</MenuItem>
	</div>
	{#each navItems as item}
		<MenuItem href={item.href} active={activeSection === item.id} onActivate={onClose}>{$t(item.labelKey)}</MenuItem>
	{/each}
	<div class="lang"><LanguageSwitcher onOpen={onClose} /></div>
</nav>
