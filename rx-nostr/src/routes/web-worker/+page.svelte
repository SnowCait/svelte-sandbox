<script lang="ts">
	import { browser } from '$app/environment';
	import type { Event } from 'nostr-typedef';
	import { createRxBackwardReq, createRxNostr, uniq } from 'rx-nostr';
	import { createNoopClient, createVerificationServiceClient } from 'rx-nostr-crypto';
	import { onDestroy, onMount } from 'svelte';
	import workerUrl from '$lib/worker?worker&url';
	import { relays } from '$lib/Constants';

	const events = new Map<string, Event>();

	const verificationClient = browser
		? createVerificationServiceClient({ worker: new Worker(workerUrl, { type: 'module' }) })
		: createNoopClient();

	const rxNostr = createRxNostr({
		verifier: verificationClient.verifier
	});
	rxNostr.setDefaultRelays(relays);
	verificationClient.start();

	const req = createRxBackwardReq();
	const subscription = rxNostr
		.use(req)
		.pipe(uniq())
		.subscribe({
			next: ({ event, from }) => {
				console.log(from, event);
				events.set(event.id, event);
			},
			complete: () => console.log('[count]', events.size)
		});

	onMount(() => {
		console.log('[on mount]');
		req.emit([{ limit: 100 }]);
		req.over();
	});

	onDestroy(() => {
		console.log('[on destroy]');
		subscription.unsubscribe();
	});
</script>

<h1>Web Worker</h1>

<a href="/">Top</a>
