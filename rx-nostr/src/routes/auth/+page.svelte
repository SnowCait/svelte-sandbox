<script lang="ts">
	import { createRxForwardReq, createRxNostr } from 'rx-nostr';
	import { verifier } from 'rx-nostr-crypto';
	import { onDestroy } from 'svelte';

	const rxNostr = createRxNostr({ authenticator: 'auto', verifier });
	rxNostr.setDefaultRelays(['wss://cfrelay.snowcait.workers.dev/']);
	const req = createRxForwardReq();
	rxNostr.use(req).subscribe({
		next: ({ subId, event }) => {
			console.log('[EVENT]', subId, event);
		}
	});

	function subscribe(): void {
		console.log('[REQ]');
		req.emit([{ kinds: [1], limit: 1 }]);
	}

	function send(): void {
		console.log('[EVENT]');
		rxNostr.send({ kind: 1, content: '' });
	}

	onDestroy(() => {
		rxNostr.dispose();
	});
</script>

<button on:click={subscribe}>Subscribe</button>
<button on:click={send}>Send</button>
