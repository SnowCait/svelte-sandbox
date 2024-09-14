<script lang="ts">
	import { SSE } from 'sse.js';
	import { type Filter } from 'nostr-typedef';

	function req() {
		const relays = ['wss://yabu.me/', 'wss://nos.lol/'];
		const filters: Filter[] = [
			{
				limit: 50
			}
		];
		const eventSource = new SSE('http://127.0.0.1:8787/req', {
			method: 'POST',
			payload: JSON.stringify({ relays, filters })
		});
		eventSource.addEventListener('EVENT', (e: MessageEvent) => {
			console.log(e.data);
		});
		eventSource.addEventListener('EOSE', () => {
			eventSource.close();
		});
	}
</script>

<button on:click={req}>REQ</button>
