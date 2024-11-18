<script lang="ts">
	const servers = [
		'https://nostr-image-optimizer.ocknamo.com/image/',
		'https://api.yabu.me/v0/images/optimize/'
	];

	let server = $state(servers[0]);

	function changed() {
		console.log(server);
	}
</script>

<input
	type="url"
	list="servers"
	placeholder="https://..."
	bind:value={server}
	onchange={changed}
/>

<datalist id="servers">
	{#each servers as server}
		<option value={server}></option>
	{/each}
</datalist>

<p>Input: {server}</p>
