<script lang="ts">
	import { t } from '$lib/scripts/language.ts';
	import { PROJECT_NAME } from '$lib/scripts/project.ts';
</script>

<style>
	.footer {
		background: var(--background);
		border-top: 1px solid var(--border);
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.7);
		padding: 2rem;
		text-align: center;
		color: var(--text-muted);
		font-size: 0.85rem;
	}
</style>

<footer class="footer">
	<p>2022 - {new Date().getFullYear()} - <a href="/">{PROJECT_NAME}</a> {$t('footer.by')} <a href="https://libersoft.org" target="_blank" rel="noopener noreferrer">LiberSoft</a></p>
</footer>
