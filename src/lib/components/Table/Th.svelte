<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		align?: 'left' | 'center' | 'right';
		highlight?: boolean;
		children?: Snippet;
	}
	let { align = 'center', highlight = false, children }: Props = $props();
</script>

<style>
	th {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--separator);
		background: var(--background-light);
		color: var(--foreground);
		font-weight: 700;
		font-size: 1rem;
	}

	.highlight {
		background: rgba(255, 221, 51, 0.06);
		color: var(--foreground);
	}

	@media (--mobile) {
		th {
			padding: 0.75rem 0.5rem;
			font-size: 0.9rem;
		}
	}
</style>

<th class:highlight style:text-align={align}>
	{#if children}{@render children()}{/if}
</th>
