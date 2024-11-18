<script lang="ts">
	import type { Event } from 'nostr-typedef';
	import { NostrFetcher } from 'nostr-fetch';
	import { SimplePool } from 'nostr-tools';
	import { onDestroy, onMount } from 'svelte';

	const relays = ['wss://yabu.me/', 'wss://nos.lol/'];
	const fetcher = NostrFetcher.init();
	const pool = new SimplePool();
	const minutesAgo = (n: number, time = Math.floor(Date.now() / 1000)): number => time - n * 60;
	const getUntil = (): number =>
		events.length > 0
			? Math.min(...events.map((event) => event.created_at))
			: Math.floor(Date.now() / 1000);

	let events: Event[] = $state([]);
	let end = $state(false);

	onMount(async () => {
		await load();
	});

	onDestroy(() => {
		fetcher.shutdown();
		pool.close(relays);
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
			if (events.some((e) => e.id === event.id)) {
				continue;
			}
			events.push(event);
			events = events;
		}

		const length = events.length - startLength;
		if (length < 50) {
			const limit = 50 - length;
			const e = await fetcher.fetchLatestEvents(relays, { kinds: [1] }, limit, {
				asOf: getUntil()
			});
			events.push(...e);
			events = events;
		}

		events = events.toSorted((x, y) => y.created_at - x.created_at);

		if (events.length === startLength) {
			end = true;
		}
	}
</script>

<header>
	<div>Count: {events.length}</div>
	<div>End: {end}</div>
</header>

<div>
	{#each events as event}
		<div>
			{new Date(event.created_at * 1000).toLocaleString()}
			{event.pubkey.substring(0, 5)}: {event.content}
		</div>
	{/each}
</div>

<button onclick={load}>Load</button>

<style>
	header {
		position: sticky;
		top: 0;
		background-color: white;
	}
</style>
