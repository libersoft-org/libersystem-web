<script lang="ts">
	import { currentLanguage, languages, setLanguage, getFlagURL, languageDialogOpen, closeLanguageDialog, t } from '../scripts/language.ts';
	import Dialog from './Dialog.svelte';
	import Input from './Input.svelte';

	let filter = $state('');
	let filteredLanguages = $derived.by(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return languages;
		return languages.filter(l => l.id.toLowerCase().includes(q) || l.label.toLowerCase().includes(q) || l.nativeLabel.toLowerCase().includes(q));
	});

	function selectLanguage(id: string): void {
		setLanguage(id);
		filter = '';
		closeLanguageDialog();
	}

	function handleItemClick(e: MouseEvent): void {
		const target = e.currentTarget as HTMLElement;
		const id = target.dataset.lang;
		if (id) selectLanguage(id);
	}

	function handleItemKey(e: KeyboardEvent): void {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		const target = e.currentTarget as HTMLElement;
		const id = target.dataset.lang;
		if (id) selectLanguage(id);
	}

	function handleClose(): void {
		filter = '';
		closeLanguageDialog();
	}

	function scrollToActive(node: HTMLElement): void {
		const active = node.querySelector('.item.active') as HTMLElement | null;
		if (!active) return;
		// Wait for layout, then center the active item within its scroll container
		requestAnimationFrame(() => {
			active.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
		});
	}

	function autofocus(node: HTMLElement): void {
		requestAnimationFrame(() => {
			const input = node.querySelector('input') as HTMLInputElement | null;
			input?.focus();
		});
	}
</script>

<style>
	.search {
		position: sticky;
		top: 0;
		z-index: 1;
		padding: 0.5rem;
		background: var(--background);
		border-bottom: 1px solid var(--border);
	}

	.list {
		padding: 0.5rem;
	}

	.empty {
		padding: 1rem;
		color: var(--text-muted);
		text-align: center;
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.75rem;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.15s;
	}

	.item:hover,
	.item:focus-visible {
		background: var(--hover-bg);
		outline: none;
	}

	.item.active {
		background: var(--hover-bg);
		box-shadow: inset 0 0 0 2px var(--foreground);
	}

	.flag {
		width: 32px;
		height: 22px;
		border-radius: 3px;
		overflow: hidden;
		flex: none;
	}

	.flag img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}

	.name {
		color: var(--text);
		font-size: 1rem;
	}
</style>

<Dialog open={$languageDialogOpen} title={$t('menu.selectLanguage')} closeLabel={$t('menu.close')} onClose={handleClose}>
	{#snippet body()}
		<div class="search" use:autofocus>
			<Input type="search" bind:value={filter} placeholder={$t('menu.searchLanguage')} ariaLabel={$t('menu.searchLanguage')} />
		</div>
		<div class="list" use:scrollToActive>
			{#each filteredLanguages as lang (lang.id)}
				<div class="item" class:active={$currentLanguage === lang.id} role="button" tabindex="0" data-lang={lang.id} aria-pressed={$currentLanguage === lang.id} onclick={handleItemClick} onkeydown={handleItemKey}>
					<span class="flag"><img src={getFlagURL(lang.id)} alt={lang.nativeLabel} draggable="false" /></span>
					<span class="name">{lang.label} ({lang.nativeLabel})</span>
				</div>
			{:else}
				<div class="empty">—</div>
			{/each}
		</div>
	{/snippet}
</Dialog>
