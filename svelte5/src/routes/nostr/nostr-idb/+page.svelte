<script lang="ts">
	import { NostrIDB, openDB } from 'nostr-idb';
	import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools';
	import { now } from 'rx-nostr';
	import { onMount } from 'svelte';

	const seckey = generateSecretKey();
	const pubkey = getPublicKey(seckey);
	const event1 = finalizeEvent(
		{ kind: 0, content: JSON.stringify({ name: 'test' }), tags: [], created_at: now() },
		seckey
	);
	const event2 = finalizeEvent({ kind: 1, content: 'hello', tags: [], created_at: now() }, seckey);

	onMount(async () => {
		const db = await openDB('test');
		console.log(db);
		const nostrIDB = new NostrIDB(db);
		await nostrIDB.start();
		await nostrIDB.add(event1);
		await nostrIDB.add(event2);

		// add の直後だと undefined になる
		setTimeout(async () => {
			const metadata = await nostrIDB.replaceable(0, pubkey);
			console.log('[metadata]', metadata);
			const note = await nostrIDB.event(event2.id);
			console.log('[note]', note);
			await nostrIDB.stop();
		}, 1000);
	});
</script>

<h1>nostr-idb</h1>
