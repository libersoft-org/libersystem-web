<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<style>
	tbody :global(tr:last-child td) {
		border-bottom: none;
	}

	tbody :global(tr:hover) {
		background: var(--hover-bg);
	}
</style>

<tbody>
	{#if children}{@render children()}{/if}
</tbody>
