<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import Section from '$lib/components/Section.svelte';
	import Card from '$lib/components/Card.svelte';
	import Cards from '$lib/components/Cards.svelte';
	import Icon from '$lib/components/Icon.svelte';
	interface ContactLink {
		labelKey: string | null; // null = use raw label (e.g. email)
		label: string;
		href: string;
		icon: string;
	}
	const contactLinks: ContactLink[] = [
		{ labelKey: null, label: 'info@libersoft.org', href: 'mailto:info@libersoft.org', icon: '/icons/email.svg' },
		{ labelKey: null, label: 'GitHub', href: 'https://github.com/libersoft-org', icon: '/icons/github.svg' },
		{ labelKey: 'contact.links.telegramChat', label: 'Telegram Chat Group', href: 'https://t.me/libersoft', icon: '/icons/telegram.svg' },
		{ labelKey: 'contact.links.telegramAnnouncements', label: 'Telegram Announcements', href: 'https://t.me/libersoft_ann', icon: '/icons/telegram.svg' },
		{ labelKey: null, label: 'LinkedIn', href: 'https://www.linkedin.com/company/libersoft-org/', icon: '/icons/linkedin.svg' },
		{ labelKey: 'contact.links.facebook', label: 'Facebook Group', href: 'https://www.facebook.com/groups/libersoft', icon: '/icons/facebook.svg' },
	];

	function linkLabel(link: ContactLink, translate: (key: string) => string): string {
		return link.labelKey ? translate(link.labelKey) : link.label;
	}
</script>

<style>
	h3 {
		font-size: 1.4rem;
		color: var(--foreground);
		margin-bottom: 1.25rem;
	}

	.address p {
		color: var(--text);
		line-height: 1.8;
		font-size: 0.95rem;
	}

	.org-id {
		margin-top: 0.75rem;
		font-family: 'Ubuntu Mono', monospace;
		color: var(--text-muted) !important;
		font-size: 0.85rem !important;
	}

	.contact-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.contact-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		color: var(--text);
		font-size: 0.95rem;
		transition: background 0.2s;
	}

	.contact-link:hover {
		background: var(--hover-bg);
		opacity: 1;
	}
</style>

<Section id="contact" title={$t('contact.title')}>
	<Cards gap="2rem" maxWidth="800px">
		<Card>
			<h3>LiberSoft</h3>
			<div class="address">
				<p>Liberty Street 1</p>
				<p>Liberty City</p>
				<p>LL-00001 Liberland</p>
				<p class="org-id">ID: LLC230002</p>
			</div>
		</Card>
		<Card>
			<h3>{$t('contact.getInTouch')}</h3>
			<ul class="contact-list">
				{#each contactLinks as link}
					<li>
						<a href={link.href} target="_blank" rel="noopener noreferrer" class="contact-link">
							<Icon img={link.icon} alt={linkLabel(link, $t)} size="20px" colorVariable="--foreground" />
							<span>{linkLabel(link, $t)}</span>
						</a>
					</li>
				{/each}
			</ul>
		</Card>
	</Cards>
</Section>
