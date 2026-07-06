<script lang="ts">
	import Hero from '$lib/sections/Hero.svelte';
	import About from '$lib/sections/About.svelte';
	import Download from '$lib/sections/Download.svelte';
	import Screenshots from '$lib/sections/Screenshots.svelte';
	import Documentation from '$lib/sections/Documentation.svelte';
	import Comparison from '$lib/sections/Comparison.svelte';
	import Contact from '$lib/sections/Contact.svelte';
</script>

<!-- Toplist -->
<a href="https://www.toplist.cz/stat/1842146/" id="toplistcz1842146" title="TOPlist" target="_blank" rel="noopener noreferrer">
	<noscript>
		<img src="https://toplist.cz/dot.asp?id=1842146&njs=1" border="0" alt="TOPlist" width="1" height="1" />
	</noscript>
	<script language="JavaScript">
		(function (d, e, s) {
			d.getElementById('toplistcz1842146').innerHTML = '<img src="https://toplist.cz/dot.asp?id=1842146&http=' + e(d.referrer) + '&t=' + e(d.title) + '&l=' + e(d.URL) + '&wi=' + e(s.width) + '&he=' + e(s.height) + '&cd=' + e(s.colorDepth) + '" width="1" height="1" border="0" alt="TOPlist" />';
		})(document, encodeURIComponent, window.screen);
	</script>
</a>

<Hero />
<About />
<Download />
<Screenshots />
<Documentation />
<Comparison />
<Contact />
