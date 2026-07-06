<script lang="ts">
	import { t } from '../scripts/language.ts';
	import Icon from './Icon.svelte';
	interface Props {
		images: string[];
		index: number;
		onClose: () => void;
		onPrev: () => void;
		onNext: () => void;
	}
	let { images, index, onClose, onPrev, onNext }: Props = $props();

	function handleKey(e: KeyboardEvent): void {
		if (e.key === 'Escape') onClose();
		else if (e.key === 'ArrowLeft') onPrev();
		else if (e.key === 'ArrowRight') onNext();
	}

	function handleBackdropClick(e: MouseEvent): void {
		if (e.target === e.currentTarget) onClose();
	}

	function activate(action: () => void): (e: KeyboardEvent) => void {
		return e => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				action();
			}
		};
	}

	const handleBackdropKey = activate(() => onClose());
	const handlePrevKey = activate(() => onPrev());
	const handleNextKey = activate(() => onNext());
	const handleCloseKey = activate(() => onClose());
</script>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.9);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.image-wrap {
		max-width: 90vw;
		max-height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-wrap img {
		max-width: 100%;
		max-height: 90vh;
		object-fit: contain;
		border-radius: 8px;
	}

	.nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		user-select: none;
		transition: background 0.2s;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.nav-btn:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.nav-prev {
		left: 2rem;
	}

	.nav-next {
		right: 2rem;
	}

	.close-btn {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		user-select: none;
		transition: background 0.2s;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.counter {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		font-size: 1rem;
		opacity: 0.8;
	}

	@media (--mobile) {
		.nav-prev {
			left: 0.5rem;
		}

		.nav-next {
			right: 0.5rem;
		}

		.nav-btn {
			width: 44px;
			height: 44px;
			font-size: 1.5rem;
		}
	}
</style>

<svelte:window onkeydown={handleKey} />
<div class="backdrop" role="button" tabindex="-1" aria-label={$t('screenshots.close')} onclick={handleBackdropClick} onkeydown={handleBackdropKey}>
	<div class="image-wrap">
		<img src={images[index]} alt={$t('screenshots.alt', { index: String(index + 1) })} />
	</div>
	<div class="nav-btn nav-prev" role="button" tabindex="0" aria-label={$t('screenshots.prev')} onclick={onPrev} onkeydown={handlePrevKey}>
		<Icon img="/icons/chevron-left.svg" alt="" size="28px" colorVariable="--text" />
	</div>
	<div class="nav-btn nav-next" role="button" tabindex="0" aria-label={$t('screenshots.next')} onclick={onNext} onkeydown={handleNextKey}>
		<Icon img="/icons/chevron-right.svg" alt="" size="28px" colorVariable="--text" />
	</div>
	<div class="close-btn" role="button" tabindex="0" aria-label={$t('screenshots.close')} onclick={onClose} onkeydown={handleCloseKey}>
		<Icon img="/icons/close.svg" alt="" size="22px" colorVariable="--text" />
	</div>
	<div class="counter">{index + 1} / {images.length}</div>
</div>
