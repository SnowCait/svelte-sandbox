<script lang="ts">
	import { createRxNostr, nip07Signer } from 'rx-nostr';
	import { verifier } from 'rx-nostr-crypto';

	const rxNostr = createRxNostr({ verifier, signer: nip07Signer(), authenticator: 'auto' });
	rxNostr.setDefaultRelays(['ws://127.0.0.1:8787/']);

	function sendWithAllOk() {
		rxNostr.send({ kind: 1, content: 'test' }, { completeOn: 'all-ok' }).subscribe({
			next: (packet) => {
				console.log(packet);
			},
			complete: () => {
				console.log('complete');
			},
			error: (error) => {
				console.error(error);
			}
		});
	}

	function sendWithAnyOk() {
		rxNostr.send({ kind: 1, content: 'test' }, { completeOn: 'any-ok' }).subscribe({
			next: (packet) => {
				console.log(packet);
			},
			complete: () => {
				console.log('complete');
			},
			error: (error) => {
				console.error(error);
			}
		});
	}

	function sendWithSent() {
		rxNostr.send({ kind: 1, content: 'test' }, { completeOn: 'sent' }).subscribe({
			next: (packet) => {
				console.log(packet);
			},
			complete: () => {
				console.log('complete');
			},
			error: (error) => {
				console.error(error);
			}
		});
	}

	async function cast() {
		try {
			await rxNostr.cast({ kind: 1, content: 'test' });
		} catch (error) {
			console.error(error);
		}
	}
</script>

<h1>Publish (Send / Cast)</h1>

<button on:click={sendWithAllOk}>Send (completeOn: all-ok)</button>
<button on:click={sendWithAnyOk}>Send (completeOn: any-ok)</button>
<button on:click={sendWithSent}>Send (completeOn: sent)</button>
<button on:click={cast}>Cast</button>
