<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Event } from 'nostr-typedef';
	import { batch, createRxBackwardReq, createRxNostr } from 'rx-nostr';
	import { bufferTime } from 'rxjs';

	let counter = 0;
	let pubkey = '087c51f1926f8d3cb4ff45f53a8ee2a8511cfe113527ab0e87f9c5821201a61e';
	let events: Event[] = [];

	const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

	const rxNostr = createRxNostr();
	const kind0Req = createRxBackwardReq();
	const kind3Req = createRxBackwardReq();

	rxNostr.setDefaultRelays(['wss://yabu.me/', 'wss://relay.nostr.wirednet.jp']);

	rxNostr.use(kind0Req.pipe(bufferTime(1000, null, 10), batch())).subscribe(({ event }) => {
		console.log(`[kind ${event.kind}]`, event);
		events.push(event);
		events = events;
	});

	rxNostr.use(kind3Req).subscribe(async ({ event }) => {
		console.log(`[kind ${event.kind}]`, event);
		for (const pubkey of event.tags.filter(([t]) => t === 'p').map(([, pubkey]) => pubkey)) {
			kind0Req.emit([
				{
					kinds: [0],
					authors: [pubkey],
					limit: 1
				}
			]);
			await sleep(0);
		}
	});

	onMount(() => {
		console.log('[on mount]');
		console.log('[kind 3 REQ]');
		kind3Req.emit({
			kinds: [3],
			authors: [pubkey],
			limit: 1
		});
		kind3Req.over();
	});

	onDestroy(() => {
		console.log('[on destroy]');
		rxNostr.dispose();
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
