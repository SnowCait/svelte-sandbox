<script lang="ts">
	import { SvelteMap, SvelteURL } from 'svelte/reactivity';

	let count = $state(0);
	let map = new SvelteMap<number, number>();
	let url = new SvelteURL('wss://example.com/');
	setInterval(() => {
		count++;
		map.set(count, Math.random());
	}, 500);
	setTimeout(() => {
		url.protocol = 'https:';
	}, 5000);
</script>

<div>{count}</div>
<div>{map.get(10) ?? '?'}</div>
<div>{url.href}</div>
