<script lang="ts">
	import type { Event } from 'nostr-typedef';
	import { NostrFetcher } from 'nostr-fetch';
	import { onDestroy, onMount } from 'svelte';

	const relays = ['wss://yabu.me/', 'wss://nos.lol/'];
	const fetcher = NostrFetcher.init();
	const minutesAgo = (n: number, time = Math.floor(Date.now() / 1000)): number => time - n * 60;
	const getUntil = (): number =>
		events.length > 0
			? Math.min(...events.map((event) => event.created_at))
			: Math.floor(Date.now() / 1000);

	let events: Event[] = [];
	let end = false;

	onMount(async () => {
		await load();
	});

	onDestroy(() => {
		fetcher.shutdown();
	});

	async function load() {
		const until = getUntil();
		const startLength = events.length;
		const iterator = fetcher.allEventsIterator(
			relays,
			{ kinds: [1] },
			{ since: minutesAgo(1, until), until }
		);
		for await (const event of iterator) {
			events.push(event);
			events = events;
		}

		const num = events.length - startLength;
		if (num < 50) {
			const e = await fetcher.fetchLatestEvents(
				relays,
				{ kinds: [1] /*, until: getUntil()*/ },
				50 - num
			);
			events.push(...e);
			events = events;
		}

		if (events.length === startLength) {
			end = true;
		}
	}
</script>

<header>
	<div>Count: {events.length}</div>
	<div>End: {end}</div>
</header>

<ul>
	{#each events as event}
		<div>
			{new Date(event.created_at * 1000).toLocaleString()}
			{event.pubkey.substring(0, 5)}: {event.content}
		</div>
	{/each}
</ul>

<button on:click={load}>Load</button>

<style>
	header {
		position: sticky;
		top: 0;
		background-color: white;
	}
</style>
