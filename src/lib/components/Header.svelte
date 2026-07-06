<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import { PROJECT_NAME } from '$lib/scripts/project.ts';
	import Menu from './Menu.svelte';
	interface NavItem {
		labelKey: string;
		href: string;
		id: string;
	}
	interface Props {
		navItems: NavItem[];
		activeSection: string;
		menuOpen: boolean;
		onToggleMenu: () => void;
		onCloseMenu: () => void;
	}
	let { navItems, activeSection, menuOpen, onToggleMenu, onCloseMenu }: Props = $props();

	function handleHamburgerKey(e: KeyboardEvent): void {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		onToggleMenu();
	}

	function handleOverlayKey(e: KeyboardEvent): void {
		if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Escape') return;
		e.preventDefault();
		onCloseMenu();
	}
</script>

<style>
	.topbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: var(--background);
		border-bottom: 1px solid var(--border);
		box-shadow: var(--shadow);
	}

	.topbar-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--foreground);
		letter-spacing: 1px;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.hamburger {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 110;
	}

	.hamburger span {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--text);
		margin: 5px 0;
		transition: all 0.3s;
		border-radius: 2px;
	}

	.hamburger.active span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.hamburger.active span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.active span:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 90;
		border: none;
		cursor: pointer;
	}

	@media (--mobile) {
		.hamburger {
			display: block;
		}
	}
</style>

<header class="topbar">
	<div class="topbar-inner">
		<a href="/" class="logo">{PROJECT_NAME}</a>
		<div class="right">
			<Menu {navItems} {activeSection} open={menuOpen} onClose={onCloseMenu} />
			<div class="hamburger" class:active={menuOpen} role="button" tabindex="0" aria-label={$t('menu.toggle')} aria-expanded={menuOpen} onclick={onToggleMenu} onkeydown={handleHamburgerKey}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>
</header>
{#if menuOpen}
	<div class="overlay" role="button" tabindex="0" aria-label={$t('menu.close')} onclick={onCloseMenu} onkeydown={handleOverlayKey}></div>
{/if}
