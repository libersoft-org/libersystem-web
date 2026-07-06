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

	.section-title {
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 2rem;
	}
</style>

<section {id} class="section">
	<div class="container">
		<h2 class="section-title">{title}</h2>
		{#if children}{@render children()}{/if}
	</div>
</section>
