<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		href: string;
		icon?: string;
		children: Snippet;
	}
	let { href, icon, children }: Props = $props();
	// External links open in a new tab.
	let isExternal = $derived(href.startsWith('http'));
</script>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.75rem 2rem;
		border-radius: 50px;
		font-weight: 600;
		font-size: 1.8rem;
		letter-spacing: 0.5px;
		transition: all 0.2s;
		text-decoration: none;
		border: 2px solid var(--foreground);
		color: var(--foreground);
	}

	.btn:hover {
		background: var(--foreground);
		color: var(--background);
	}

	/* Colored via currentColor so it follows the text color on hover. */
	.btn-icon {
		width: 1em;
		height: 1em;
		background-color: currentColor;
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
	}
</style>

<a {href} class="btn" target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
	{#if icon}<span class="btn-icon" style:mask-image="url('{icon}')" style:-webkit-mask-image="url('{icon}')"></span>{/if}
	{@render children()}
</a>
