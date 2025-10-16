<script lang="ts">
	import { nip19 } from 'nostr-tools';
	import type { Event as NostrEvent } from 'nostr-typedef';
	import { createRxForwardReq, createRxNostr, noopVerifier, uniq } from 'rx-nostr';
	import { onMount } from 'svelte';

	let events: NostrEvent[] = $state([]);

	const rxNostr = createRxNostr({ verifier: noopVerifier });
	rxNostr.setDefaultRelays(['wss://yabu.me/', 'wss://nos.lol/', 'wss://relay.nostr.band/']);
	const req = createRxForwardReq();
	rxNostr
		.use(req)
		.pipe(uniq())
		.subscribe(({ event }) => {
			events.unshift(event);
			events = events;
		});

	onMount(() => {
		req.emit([{ kinds: [1] }]);
	});
</script>

<h1>content-visibility</h1>

<ul>
	{#each events as event (event.id)}
		<li>
			<div>{nip19.npubEncode(event.pubkey)}</div>
			<pre>{event.content}</pre>
		</li>
	{/each}
</ul>

<style>
	li {
		content-visibility: auto;
	}
</style>
