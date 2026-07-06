<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		align?: 'left' | 'center' | 'right';
		highlight?: boolean;
		bold?: boolean;
		children?: Snippet;
	}
	let { align = 'left', highlight = false, bold = false, children }: Props = $props();
</script>

<style>
	td {
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--separator);
	}

	.highlight {
		background: rgba(255, 209, 0, 0.05);
	}

	.bold {
		font-weight: 500;
	}

	@media (--mobile) {
		td {
			padding: 0.75rem 0.5rem;
			font-size: 0.9rem;
		}
	}
</style>

<td class:highlight class:bold style:text-align={align}>
	{#if children}{@render children()}{/if}
</td>
