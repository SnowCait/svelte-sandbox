<script lang="ts">
	import { kind0Store } from '$lib/store';
	import { batch, createRxBackwardReq, createRxNostr } from 'rx-nostr';
	import { bufferTime } from 'rxjs';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let counter = 0;
	let pubkey = '087c51f1926f8d3cb4ff45f53a8ee2a8511cfe113527ab0e87f9c5821201a61e';
	$: events = [...$kind0Store].map(([, event]) => event);

	const rxNostr = createRxNostr();
	const kind0Req = createRxBackwardReq();
	const kind3Req = createRxBackwardReq();

	rxNostr.setDefaultRelays(['wss://yabu.me/', 'wss://relay.nostr.wirednet.jp']);

	rxNostr.use(kind0Req.pipe(bufferTime(1000, null, 10), batch())).subscribe(({ event }) => {
		console.log(`[kind ${event.kind}]`, event);
		const $store = get(kind0Store);
		$store.set(event.pubkey, event);
		kind0Store.set($store);
	});

	rxNostr.use(kind3Req).subscribe(({ event }) => {
		console.log(`[kind ${event.kind}]`, event);
		for (const pubkey of event.tags.filter(([t]) => t === 'p').map(([, pubkey]) => pubkey)) {
			kind0Req.emit([
				{
					kinds: [0],
					authors: [pubkey],
					limit: 1
				}
			]);
		}
	});

	onMount(() => {
		console.log('[kind 3 REQ]');
		kind3Req.emit({
			kinds: [3],
			authors: [pubkey],
			limit: 1
		});
		kind3Req.over();
	});
</script>

<a href="/yield">../</a>

<section>
	<button on:click={() => counter++}>+1</button>
	<div>{counter}</div>
</section>

<ul>
	{#each events as event}
		{@const metadata = JSON.parse(event.content)}
		<li>
			<img src={metadata.picture} alt="" width="20" height="20" />
			<span>{metadata.name}</span>
		</li>
	{/each}
</ul>
