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
	/* Black button with a yellow frame and clipped corners; hover fills yellow. */
	.btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.75rem 2rem;
		font-weight: 700;
		font-size: 1.8rem;
		letter-spacing: 0.5px;
		transition:
			background 0.2s,
			color 0.2s;
		text-decoration: none;
		background: var(--foreground);
		color: var(--foreground);
		clip-path: polygon(0 0, calc(100% - var(--notch)) 0, 100% var(--notch), 100% 100%, var(--notch) 100%, 0 calc(100% - var(--notch)));
	}

	/* Inner fill inset by 2px forms the frame; it disappears on hover. */
	.btn::before {
		content: '';
		position: absolute;
		inset: 2px;
		background: var(--background);
		clip-path: polygon(0 0, calc(100% - var(--notch)) 0, 100% var(--notch), 100% 100%, var(--notch) 100%, 0 calc(100% - var(--notch)));
		transition: opacity 0.2s;
	}

	.btn:hover {
		color: var(--background);
	}

	.btn:hover::before {
		opacity: 0;
	}

	/* Label above the ::before fill layer. */
	.btn-label {
		position: relative;
	}

	/* Colored via currentColor so it follows the text color on hover. */
	.btn-icon {
		position: relative;
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

	@media (--mobile) {
		.btn {
			font-size: 1.4rem;
		}
	}
</style>

<a {href} class="btn" target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
	{#if icon}<span class="btn-icon" style:mask-image="url('{icon}')" style:-webkit-mask-image="url('{icon}')"></span>{/if}
	<span class="btn-label">{@render children()}</span>
</a>
