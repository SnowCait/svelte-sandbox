<script lang="ts">
	let url = $state('');
	let text = $state('');

	async function request(e: SubmitEvent) {
		e.preventDefault();
		const response = await fetch(url);
		text = await response.text();
	}
</script>

<form onsubmit={request}>
	<input type="url" bind:value={url} />
	<input type="submit" />
</form>

<pre>{text}</pre>
