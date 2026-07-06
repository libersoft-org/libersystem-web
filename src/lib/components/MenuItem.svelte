<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		href?: string;
		active?: boolean;
		ariaLabel?: string;
		ariaHaspopup?: 'dialog' | 'menu' | 'true' | 'false';
		onActivate?: () => void;
		children: Snippet;
		trailing?: Snippet;
	}
	let { href, active = false, ariaLabel, ariaHaspopup, onActivate, children, trailing }: Props = $props();

	function handleClick(): void {
		onActivate?.();
	}

	function handleKey(e: KeyboardEvent): void {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		onActivate?.();
	}
</script>

<style>
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		color: var(--text);
		font-weight: 500;
		font-size: 1.1rem;
		text-transform: none;
		letter-spacing: 0.5px;
		cursor: pointer;
		transition:
			color 0.2s,
			background 0.2s;
	}

	.item:hover {
		color: var(--foreground);
	}

	.item.active {
		color: var(--foreground);
	}

	.trailing {
		display: inline-flex;
		align-items: center;
	}

	@media (--mobile) {
		.item {
			padding: 1rem 2rem;
			border-bottom: 1px solid var(--border);
		}

		.item:hover {
			background: var(--hover-bg);
		}
	}
</style>

{#if href}
	<a {href} class="item" class:active aria-label={ariaLabel} onclick={handleClick}>
		<span class="label">{@render children()}</span>
		{#if trailing}<span class="trailing">{@render trailing()}</span>{/if}
	</a>
{:else}
	<div class="item" role="button" tabindex="0" aria-label={ariaLabel} aria-haspopup={ariaHaspopup} onclick={handleClick} onkeydown={handleKey}>
		<span class="label">{@render children()}</span>
		{#if trailing}<span class="trailing">{@render trailing()}</span>{/if}
	</div>
{/if}
