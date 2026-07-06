<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children: Snippet;
		minWidth?: string;
		gap?: string;
		maxWidth?: string;
	}
	let { children, minWidth = '320px', gap = '1.5rem', maxWidth = '' }: Props = $props();
</script>

<style>
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--gap);
	}

	.cards > :global(*) {
		flex: 1 1 var(--min-w);
		max-width: calc(50% - var(--gap) / 2);
	}

	@media (--mobile) {
		.cards > :global(*) {
			max-width: 100%;
		}
	}
</style>

<div class="cards" style="--min-w:{minWidth};--gap:{gap};{maxWidth ? `max-width:${maxWidth};margin:0 auto` : ''}">
	{@render children()}
</div>
