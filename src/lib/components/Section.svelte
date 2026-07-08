<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		id?: string;
		title: string;
		children?: Snippet;
	}
	let { id, title, children }: Props = $props();
</script>

<style>
	.section {
		padding: 5rem 2rem;
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
	}

	/* Centered title underlined across the whole text. */
	.section-head {
		text-align: center;
		margin-bottom: 3rem;
	}

	.section-title {
		display: inline-block;
		font-size: 2.5rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		text-decoration: underline;
		text-decoration-color: var(--foreground);
		text-decoration-thickness: 4px;
		text-underline-offset: 0.2em;
	}
</style>

<section {id} class="section">
	<div class="container">
		<div class="section-head"><h2 class="section-title">{title}</h2></div>
		{#if children}{@render children()}{/if}
	</div>
</section>
