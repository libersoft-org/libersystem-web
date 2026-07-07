<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import Section from '$lib/components/Section.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	const images = ['/screenshots/screenshot01.webp', '/screenshots/screenshot02.webp', '/screenshots/screenshot03.webp', '/screenshots/screenshot04.webp'];
	let galleryIndex = $state(-1);
	let galleryOpen = $derived(galleryIndex >= 0);

	function openGallery(index: number): void {
		galleryIndex = index;
	}

	function closeGallery(): void {
		galleryIndex = -1;
	}

	function prevImage(): void {
		galleryIndex = (galleryIndex - 1 + images.length) % images.length;
	}

	function nextImage(): void {
		galleryIndex = (galleryIndex + 1) % images.length;
	}

	function getIndexFromEvent(e: Event): number {
		const target = e.currentTarget as HTMLElement;
		return Number(target.dataset.index);
	}

	function handleThumbClick(e: MouseEvent): void {
		openGallery(getIndexFromEvent(e));
	}

	function handleThumbKey(e: KeyboardEvent): void {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openGallery(getIndexFromEvent(e));
		}
	}
</script>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
		gap: 1rem;
	}

	/* Same panel language as Card: sharp corners + yellow corner brackets. */
	.thumb {
		position: relative;
		aspect-ratio: 16 / 9;
		cursor: pointer;
		border: 1px solid var(--border);
		transition:
			transform 0.2s,
			border-color 0.2s;
	}

	.thumb::before,
	.thumb::after {
		content: '';
		position: absolute;
		width: 14px;
		height: 14px;
		pointer-events: none;
		z-index: 1;
	}

	.thumb::before {
		top: -1px;
		left: -1px;
		border-top: 2px solid var(--foreground);
		border-left: 2px solid var(--foreground);
	}

	.thumb::after {
		bottom: -1px;
		right: -1px;
		border-bottom: 2px solid var(--foreground);
		border-right: 2px solid var(--foreground);
	}

	.thumb:hover {
		transform: translateY(-2px);
		border-color: var(--border-hover);
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>

<Section id="screenshots" title={$t('screenshots.title')}>
	<div class="grid">
		{#each images as src, i}
			<div class="thumb" role="button" tabindex="0" aria-label={$t('screenshots.open', { index: String(i + 1) })} data-index={i} onclick={handleThumbClick} onkeydown={handleThumbKey}>
				<img {src} alt={$t('screenshots.alt', { index: String(i + 1) })} loading="lazy" />
			</div>
		{/each}
	</div>
</Section>
{#if galleryOpen}
	<Gallery {images} index={galleryIndex} onClose={closeGallery} onPrev={prevImage} onNext={nextImage} />
{/if}
