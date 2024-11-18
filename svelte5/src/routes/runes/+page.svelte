<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';

	let count = $state(0);
	let map = new SvelteMap<number, number>();
	setInterval(() => {
		count++;
		map.set(count, Math.random());
	}, 500);
</script>

<div>{count}</div>
<dvi>{map.get(10) ?? '?'}</dvi>
