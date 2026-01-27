<script lang="ts">
	import { writable } from 'svelte/store';

	let state = $state(0);
	let state2 = $derived(state * 2);

	const store = writable(0);
	let store2 = $derived($store * 3);
</script>

<h1>Rune</h1>

<h2>State</h2>
<div>state: {state}</div>
<div>$derived(state * 2): {state2}</div>
<button onclick={() => state++}>Add</button>

<h2>Store</h2>
<div>$store: {$store}</div>
<div>$derived($store * 3): {store2}</div>
<button onclick={() => ($store += 1)}>Add</button>
