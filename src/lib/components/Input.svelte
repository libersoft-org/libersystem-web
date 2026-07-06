<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		type?: 'text' | 'password' | 'email' | 'number' | 'url' | 'search';
		ariaLabel?: string;
		oninput?: (value: string) => void;
		el?: HTMLInputElement;
	}
	let { value = $bindable(''), placeholder, type = 'text', ariaLabel, oninput, el = $bindable() }: Props = $props();

	function handleInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		value = target.value;
		oninput?.(value);
	}
</script>

<style>
	.input {
		width: 100%;
		font-size: 1rem;
		font-family: inherit;
		padding: 0.6rem 0.85rem;
		border: 1px solid var(--border);
		border-left: 3px solid var(--foreground);
		background: var(--background-light);
		color: var(--text);
		outline: none;
		transition:
			border-color 0.2s,
			background 0.2s;
	}

	.input::placeholder {
		color: var(--text-muted);
	}

	.input:hover {
		border-color: var(--border-hover);
	}

	.input:focus {
		border-color: var(--foreground);
	}
</style>

<input bind:this={el} bind:value {type} {placeholder} aria-label={ariaLabel} class="input" oninput={handleInput} />
