<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import { PROJECT_NAME } from '$lib/scripts/project.ts';
	import Section from '$lib/components/Section.svelte';
	import Card from '$lib/components/Card.svelte';
	import Cards from '$lib/components/Cards.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Thead from '$lib/components/Table/Thead.svelte';
	import Tbody from '$lib/components/Table/Tbody.svelte';
	import Tr from '$lib/components/Table/Tr.svelte';
	import Th from '$lib/components/Table/Th.svelte';
	import Td from '$lib/components/Table/Td.svelte';
	// Each row compares one aspect of the system design with Linux.
	const rows: string[] = ['kernel', 'systemApi', 'security', 'storage', 'resources', 'drivers', 'memorySafety', 'applications', 'compatibility'];
</script>

<style>
	.section-desc {
		text-align: center;
		color: var(--text-muted);
		margin-bottom: 3rem;
		font-size: 1.05rem;
	}

	/* Desktop view: full table. Hidden on mobile. */
	.desktop-view {
		display: block;
	}

	/* Mobile view: one card per aspect. */
	.mobile-view {
		display: none;
	}

	@media (--mobile) {
		.desktop-view {
			display: none;
		}

		.mobile-view {
			display: block;
		}
	}

	h3 {
		font-size: 1.4rem;
		color: var(--foreground);
		margin: 0 0 0.75rem;
	}

	.entry:not(:last-child) {
		margin-bottom: 0.75rem;
	}

	.entry h4 {
		margin: 0 0 0.25rem;
		font-size: 0.95rem;
		color: var(--foreground);
	}

	.entry p {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.95rem;
		line-height: 1.7;
	}
</style>

<Section id="comparison" title={$t('comparison.title')}>
	<div class="section-desc">{$t('comparison.description', { project: PROJECT_NAME })}</div>
	<div class="desktop-view">
		<Table>
			<Thead>
				<Tr>
					<Th align="left">{$t('comparison.aspect')}</Th>
					<Th align="left" highlight>{PROJECT_NAME}</Th>
					<Th align="left">Linux</Th>
				</Tr>
			</Thead>
			<Tbody>
				{#each rows as row}
					<Tr>
						<Td bold>{$t(`comparison.rows.${row}.aspect`)}</Td>
						<Td highlight>{$t(`comparison.rows.${row}.libersystem`, { project: PROJECT_NAME })}</Td>
						<Td>{$t(`comparison.rows.${row}.linux`)}</Td>
					</Tr>
				{/each}
			</Tbody>
		</Table>
	</div>
	<div class="mobile-view">
		<Cards>
			{#each rows as row}
				<Card>
					<h3>{$t(`comparison.rows.${row}.aspect`)}</h3>
					<div class="entry">
						<h4>{PROJECT_NAME}</h4>
						<p>{$t(`comparison.rows.${row}.libersystem`, { project: PROJECT_NAME })}</p>
					</div>
					<div class="entry">
						<h4>Linux</h4>
						<p>{$t(`comparison.rows.${row}.linux`)}</p>
					</div>
				</Card>
			{/each}
		</Cards>
	</div>
</Section>
