<script lang="ts">
	import type { Event } from 'nostr-typedef';
	import { createRxForwardReq, createRxNostr, now, uniq, type LazyFilter } from 'rx-nostr';
	import { onMount } from 'svelte';

	let events: Event[] = [];

	const rxNostr = createRxNostr({ keepAliveDefaultRelayConnections: false });
	rxNostr.setDefaultRelays(['wss://yabu.me/', 'wss://nos.lol/']);

	const observable = rxNostr.createConnectionStateObservable();
	observable.subscribe((packet) => {
		console.log('[observable]', packet);
	});

	const rxReq = createRxForwardReq();
	rxNostr
		.use(rxReq)
		.pipe(uniq())
		.subscribe((packet) => {
			console.log('[req]', packet);
			events.unshift(packet.event);
			events = events;
		});

	const filters: LazyFilter[] = [
		{
			kinds: [1],
			since: now
		}
	];

	onMount(() => {
		console.log('[on mount]');
		rxReq.emit(filters);
	});

	function reconnect() {
		console.log('[reconnect before]', rxReq.rxReqId);
		rxReq.emit(filters);
		console.log('[reconnect after]', rxReq.rxReqId);
	}
</script>

<h1>Reconnect</h1>

<button on:click={reconnect}>Reconnect</button>

<ul>
	{#each events as event (event.id)}
		<li>{new Date(event.created_at * 1000)} {event.id}</li>
	{/each}
</ul>
