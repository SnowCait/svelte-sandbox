<script lang="ts">
	import { PWKManager, type NostrEvent } from 'nosskey-sdk';

	const manager = new PWKManager();

	let pubkey = '';
	let event: NostrEvent | undefined;

	async function create() {
		const credentialId = await manager.createPasskey();
		const pwk = await manager.directPrfToNostrKey(credentialId);
		manager.setCurrentPWK(pwk);
		pubkey = await manager.getPublicKey();
	}

	async function sign() {
		event = await manager.signEvent({
			kind: 1,
			content: ''
		});
	}
</script>

<h1>Nosskey</h1>

<button onclick={create}>Create</button>
<div>{pubkey}</div>
<button onclick={sign}>Sign</button>
<div>{JSON.stringify(event)}</div>
