<script lang="ts">
	interface Props {
		img?: string | undefined;
		alt?: string | undefined;
		size?: string | undefined;
		padding?: string | undefined;
		colorVariable?: string | undefined;
		noColorFilter?: boolean | undefined;
	}
	let { img, alt = '', size = '24px', padding = '0', colorVariable, noColorFilter = false }: Props = $props();
	let useMask = $derived(!!colorVariable && !noColorFilter);
</script>

<style>
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.icon-img {
		display: flex;
		user-select: none;
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
	}

	.icon-img-plain {
		display: flex;
		user-select: none;
	}
</style>

{#if img}
	<div class="icon" style:padding>
		{#if useMask}
			<div class="icon-img" role="img" aria-label={alt} style:min-width={size} style:min-height={size} style:max-width={size} style:max-height={size} style:background-color="var({colorVariable})" style:mask-image="url('{img}')" style:-webkit-mask-image="url('{img}')"></div>
		{:else}
			<img class="icon-img-plain" style:min-width={size} style:min-height={size} style:max-width={size} style:max-height={size} src={img} draggable={false} {alt} />
		{/if}
	</div>
{/if}
