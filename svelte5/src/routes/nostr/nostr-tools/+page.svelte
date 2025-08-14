<script lang="ts">
	import { SimplePool, type Event } from 'nostr-tools';

	const relays = ['wss://yabu.me/', 'wss://relay-jp.nostr.wirednet.jp/'];
	const pool = new SimplePool();

	pool.subscribeEose(
		relays,
		{ kinds: [0], authors: ['28d37e1b489437c78d64ccdbf1f44c20e3f013dba3f4c2573b25599ba6308c22'] },
		{
			onevent(event: Event) {
				console.log(event);
			},
			onclose() {
				console.log('Closed');
				// setTimeout is workaround for "WebSocket is already in CLOSING or CLOSED state."
				setTimeout(() => {
					console.log('All connections closed');
					pool.destroy();
				});
			}
		}
	);
</script>

<h1>nostr-tools</h1>
