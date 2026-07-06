<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LanguageDialog from '$lib/components/LanguageDialog.svelte';
	import Splash from '$lib/components/Splash.svelte';
	import { initLanguages } from '$lib/scripts/language.ts';
	interface Props {
		children: import('svelte').Snippet;
	}
	let { children }: Props = $props();
	let menuOpen = $state(false);
	let activeSection = $state('');
	let splashVisible = $state(true);
	const navItems = [
		{ labelKey: 'menu.about', href: '/#about', id: 'about' },
		{ labelKey: 'menu.download', href: '/#download', id: 'download' },
		{ labelKey: 'menu.screenshots', href: '/#screenshots', id: 'screenshots' },
		{ labelKey: 'menu.documentation', href: '/#documentation', id: 'documentation' },
		{ labelKey: 'menu.comparison', href: '/#comparison', id: 'comparison' },
		{ labelKey: 'menu.contact', href: '/#contact', id: 'contact' },
	];

	function toggleMenu(): void {
		menuOpen = !menuOpen;
	}

	function closeMenu(): void {
		menuOpen = false;
	}

	onMount(() => {
		// Fetch default + target language in parallel, then hide the splash.
		initLanguages().then(() => {
			requestAnimationFrame(() => {
				splashVisible = false;
			});
		});

		const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{ rootMargin: '-40% 0px -40% 0px', threshold: 0 }
		);
		for (const section of sections) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<style>
	/* Blueprint grid background: fine lines with stronger lines every 5 cells,
	   plus a soft yellow glow at the top. */
	.grid-bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size:
			28px 28px,
			28px 28px,
			140px 140px,
			140px 140px;
	}

	.grid-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 221, 51, 0.08), transparent 70%);
	}

	main {
		padding-top: 64px;
	}
</style>

<div class="grid-bg"></div>
<Header {navItems} {activeSection} {menuOpen} onToggleMenu={toggleMenu} onCloseMenu={closeMenu} />
<main>
	{@render children()}
</main>
<Footer />
<LanguageDialog />
<Splash show={splashVisible} />
