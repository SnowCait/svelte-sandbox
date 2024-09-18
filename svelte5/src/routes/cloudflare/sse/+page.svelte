<script lang="ts">
	import { SSE } from 'sse.js';
	import type { Filter, Event } from 'nostr-typedef';

	function req() {
		const relays = ['wss://yabu.me/', 'wss://nos.lol/'];
		const filters: Filter[] = [
			{
				limit: 50
			}
		];
		const source = new SSE('http://127.0.0.1:8787/req/stream', {
			method: 'POST',
			payload: JSON.stringify({ relays, filters })
		});
		source.addEventListener('message', (e: MessageEvent<Event>) => {
			console.log(e.data);
		});
	}
</script>

<button on:click={req}>REQ</button>
