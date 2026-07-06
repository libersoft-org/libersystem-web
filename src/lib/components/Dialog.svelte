<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	interface Props {
		open: boolean;
		title: string;
		closeLabel?: string;
		onClose: () => void;
		body: Snippet;
	}
	let { open, title, closeLabel = 'Close', onClose, body }: Props = $props();

	function handleBackdropClick(e: MouseEvent): void {
		if (e.target === e.currentTarget) onClose();
	}

	function handleBackdropKey(e: KeyboardEvent): void {
		if (e.key !== 'Escape') return;
		e.preventDefault();
		onClose();
	}

	function handleCloseKey(e: KeyboardEvent): void {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		onClose();
	}

	function lockScroll(): { destroy: () => void } {
		const prevOverflow = document.body.style.overflow;
		const prevPaddingRight = document.body.style.paddingRight;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
		return {
			destroy(): void {
				document.body.style.overflow = prevOverflow;
				document.body.style.paddingRight = prevPaddingRight;
			},
		};
	}
</script>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.dialog {
		background: var(--background);
		border: 1px solid var(--border-hover);
		border-radius: 12px;
		box-shadow: var(--shadow);
		max-width: 420px;
		width: 100%;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.dialog-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-left: 1.25rem;
		border-bottom: 1px solid var(--border);
		font-weight: bold;
		color: var(--foreground);
		font-size: 1.1rem;
	}

	.title {
		flex: 1;
		min-width: 0;
	}

	.close {
		flex: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 6px;
		color: var(--text);
		cursor: pointer;
		transition:
			color 0.15s,
			background 0.15s;
		font-size: 1.75rem;
		font-weight: bold;
		line-height: 1;
	}

	.close:hover,
	.close:focus-visible {
		background: var(--hover-bg);
		color: var(--foreground);
		outline: none;
	}

	.dialog-body {
		overflow-y: auto;
	}
</style>

{#if open}
	<div class="backdrop" role="button" tabindex="-1" aria-label={title} onclick={handleBackdropClick} onkeydown={handleBackdropKey} use:lockScroll>
		<div class="dialog" role="dialog" aria-modal="true" aria-label={title}>
			<div class="dialog-header">
				<span class="title">{title}</span>
				<div class="close" role="button" tabindex="0" aria-label={closeLabel} onclick={onClose} onkeydown={handleCloseKey}>
					<Icon img="/icons/close.svg" alt={closeLabel} size="2rem" colorVariable="--text" />
				</div>
			</div>
			<div class="dialog-body">
				{@render body()}
			</div>
		</div>
	</div>
{/if}
