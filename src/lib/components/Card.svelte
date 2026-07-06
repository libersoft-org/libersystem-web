<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children: Snippet;
		noPadding?: boolean;
	}
	let { children, noPadding = false }: Props = $props();
</script>

<style>
	/* Sharp-cornered panel with yellow corner brackets (HUD style). */
	.card {
		position: relative;
		background: var(--background);
		border: 1px solid var(--border);
		transition: border-color 0.2s;
	}

	.card::before,
	.card::after {
		content: '';
		position: absolute;
		width: 14px;
		height: 14px;
		pointer-events: none;
	}

	.card::before {
		top: -1px;
		left: -1px;
		border-top: 2px solid var(--foreground);
		border-left: 2px solid var(--foreground);
	}

	.card::after {
		bottom: -1px;
		right: -1px;
		border-bottom: 2px solid var(--foreground);
		border-right: 2px solid var(--foreground);
	}

	.card:hover {
		border-color: var(--border-hover);
	}

	.card.padded {
		padding: 2rem;
	}
</style>

<div class="card" class:padded={!noPadding}>
	{@render children()}
</div>
