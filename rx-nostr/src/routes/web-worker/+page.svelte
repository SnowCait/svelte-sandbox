<script lang="ts">
	import { browser } from '$app/environment';
	import type { Event } from 'nostr-typedef';
	import {
		createRxBackwardReq,
		createRxNostr,
		filterByKind,
		latestEach,
		uniq,
		type LazyFilter
	} from 'rx-nostr';
	import { createNoopClient, createVerificationServiceClient } from 'rx-nostr-crypto';
	import { onDestroy, onMount } from 'svelte';
	import workerUrl from '$lib/worker?worker&url';
	import { relays } from '$lib/Constants';
	import { share, tap } from 'rxjs';

	const events = new Map<string, Event>();

	const verificationClient = browser
		? createVerificationServiceClient({ worker: new Worker(workerUrl, { type: 'module' }) })
		: createNoopClient();

	const rxNostr = createRxNostr({
		verifier: verificationClient.verifier
	});
	rxNostr.setDefaultRelays(relays);
	verificationClient.start();

	const depth = 0;
	const req = createRxBackwardReq();
	const subscription = rxNostr
		.use(req)
		.pipe(
			uniq(),
			tap(({ event }) => references(event, depth))
		)
		.subscribe({
			next: ({ event }) => {
				console.log('[kind 1]', depth, event.id);
				events.set(event.id, event);
			},
			complete: () => console.log('[count]', events.size),
			error: (error) => {
				console.error('[kind 1]', depth, error);
			}
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

	function references(event: Event, depth = 0): void {
		depth++;

		const ids = event.tags.filter(([t]) => t === 'e').map(([, id]) => id);
		const filters: LazyFilter[] = [
			{
				kinds: [0],
				authors: [event.pubkey]
			}
		];
		if (ids.length > 0) {
			filters.push({
				ids
			});
		}

		const req = createRxBackwardReq();
		const observable$ = rxNostr.use(req).pipe(uniq(), share());
		observable$
			.pipe(
				filterByKind(0),
				latestEach(({ event }) => event.pubkey)
			)
			.subscribe({
				next: ({ event }) => {
					console.log('[kind 0]', depth, event.id);
				},
				complete: () => {
					console.log('[kind 0]', depth, 'complete');
				},
				error: (error) => {
					console.error('[kind 0]', depth, error);
				}
			});
		observable$
			.pipe(
				filterByKind(1),
				tap(({ event }) => references(event, depth))
			)
			.subscribe({
				next: ({ event }) => {
					console.log('[kind 1]', depth, event.id);
				},
				complete: () => {
					console.log('[kind 1]', depth, 'complete');
				},
				error: (error) => {
					console.error('[kind 1]', depth, error);
				}
			});
		req.emit(filters);
		req.over();
	}
</script>

<h1>Web Worker</h1>

<a href="/">Top</a>
