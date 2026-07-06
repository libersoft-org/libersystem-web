<script lang="ts">
	import Card from './Card.svelte';
	import Icon from './Icon.svelte';
	interface Props {
		icon: string;
		title: string;
		description: string;
	}
	let { icon, title, description }: Props = $props();
</script>

<style>
	.feature-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	h3 {
		font-size: 1.4rem;
		color: var(--foreground);
		margin: 0;
	}

	p {
		color: var(--text-muted);
		font-size: 0.95rem;
		line-height: 1.7;
		margin: 0;
		text-align: justify;
	}
</style>

<Card>
	<div class="feature-header">
		<Icon img={icon} alt={title} size="32px" colorVariable="--foreground" />
		<h3>{title}</h3>
	</div>
	<p>{description}</p>
</Card>
