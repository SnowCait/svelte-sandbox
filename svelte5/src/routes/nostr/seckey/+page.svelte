<script lang="ts">
	function generateSecretKey() {
		const array = new Uint8Array(32);
		return crypto.getRandomValues(array);
	}

	function handleClick() {
		console.time('generate-keys');
		for (let i = 0; i < 10000; i++) {
			generateSecretKey();
		}
		console.timeEnd('generate-keys');
	}
</script>

<h1>Nostr Secret Key</h1>
<button onclick={handleClick}>Generate Key</button>
