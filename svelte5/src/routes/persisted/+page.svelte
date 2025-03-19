<script lang="ts">
	import { persisted } from 'svelte-persisted-store';

	const history = persisted<number[]>('test', []);

	function add() {
		$history = [...$history, $history.length];
	}
</script>

<h1>
	<a href="https://github.com/joshnuss/svelte-persisted-store" target="_blank">
		svelte-persisted-store
	</a>
</h1>

<div>{JSON.stringify($history)}</div>

<button onclick={add}>add</button>
