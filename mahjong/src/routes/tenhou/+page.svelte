<script lang="ts">
	import { type Root } from '$lib/tenhou';
	import Player from './Player.svelte';

	let url = $state('');
	let data = $derived.by(() => {
		if (!URL.canParse(url)) {
			return undefined;
		}
		const u = new URL(url);
		const params = new URLSearchParams(u.hash.substring(1));
		const json = params.get('json');
		if (json == null) {
			return;
		}
		try {
			return JSON.parse(json) as Root;
		} catch {
			return undefined;
		}
	});
</script>

<h1>天鳳</h1>

<form onsubmit={(e) => e.preventDefault()}>
	<input type="url" bind:value={url} />
	<input type="submit" />
</form>

{#if data}
	<Player {data} />
{/if}
