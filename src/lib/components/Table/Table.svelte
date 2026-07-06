<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<style>
	.table-wrapper {
		overflow-x: auto;
		border-radius: 12px;
		background: var(--background);
		box-shadow: var(--shadow);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 600px;
	}
</style>

<div class="table-wrapper">
	<table>
		{#if children}{@render children()}{/if}
	</table>
</div>
