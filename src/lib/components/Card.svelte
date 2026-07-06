<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children: Snippet;
		noPadding?: boolean;
	}
	let { children, noPadding = false }: Props = $props();
</script>

<style>
	.card {
		background: var(--background);
		border: 1px solid var(--border-hover);
		border-radius: 12px;
		overflow: hidden;
	}

	.card.padded {
		padding: 2rem;
	}
</style>

<div class="card" class:padded={!noPadding}>
	{@render children()}
</div>
