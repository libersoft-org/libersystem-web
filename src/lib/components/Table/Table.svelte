<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<style>
	/* Same panel language as Card: sharp corners + yellow corner brackets.
	   The brackets live on a non-scrolling frame so they cannot create overflow
	   inside the scroll container. */
	.table-frame {
		position: relative;
		background: var(--background);
		border: 1px solid var(--border);
	}

	.table-frame::before,
	.table-frame::after {
		content: '';
		position: absolute;
		width: 14px;
		height: 14px;
		pointer-events: none;
		z-index: 1;
	}

	.table-frame::before {
		top: -1px;
		left: -1px;
		border-top: 2px solid var(--foreground);
		border-left: 2px solid var(--foreground);
	}

	.table-frame::after {
		bottom: -1px;
		right: -1px;
		border-bottom: 2px solid var(--foreground);
		border-right: 2px solid var(--foreground);
	}

	.table-wrapper {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 600px;
	}
</style>

<div class="table-frame">
	<div class="table-wrapper">
		<table>
			{#if children}{@render children()}{/if}
		</table>
	</div>
</div>
