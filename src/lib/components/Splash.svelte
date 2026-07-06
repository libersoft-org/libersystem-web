<script lang="ts">
	import Spinner from './Spinner.svelte';
	import { PROJECT_NAME } from '$lib/scripts/project.ts';
	interface Props {
		show: boolean;
	}
	let { show }: Props = $props();
</script>

<style>
	.splash {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: var(--background-dark);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		transition: opacity 0.25s ease;
	}

	.splash.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.title {
		font-size: 3rem;
		font-weight: 700;
		color: var(--foreground);
		letter-spacing: 1px;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	/* Blinking terminal block cursor, same as the header logo. */
	.title::after {
		content: '';
		width: 0.55em;
		height: 1em;
		background: var(--foreground);
		animation: cursor-blink 1.2s steps(1) infinite;
	}
</style>

<div class="splash" class:hidden={!show} aria-hidden={!show}>
	<div class="title">{PROJECT_NAME}</div>
	<Spinner size="48px" />
</div>
