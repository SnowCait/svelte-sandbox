<script lang="ts">
	import Dexie, { type EntityTable } from 'dexie';
	import type { Event } from 'nostr-tools';
	import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools';
	import { now } from 'rx-nostr';
	import { onMount } from 'svelte';

	class NostrIDB {
		private db: Dexie & {
			events: EntityTable<Event, 'id'>;
		};

		constructor() {
			this.db = new Dexie('dexie-test') as Dexie & {
				events: EntityTable<Event, 'id'>;
			};
			this.db.version(1).stores({
				events: 'id, kind, pubkey, created_at, [kind+pubkey]'
			});
		}

		async add(event: Event) {
			await this.db.events.put(event);
		}

		async event(id: string): Promise<Event | undefined> {
			return await this.db.events.get(id);
		}

		async replaceable(kind: number, pubkey: string): Promise<Event | undefined> {
			const events = await this.db.events
				.filter((event) => event.kind === kind && event.pubkey === pubkey)
				.toArray();

			if (events.length === 0) return undefined;

			return events.reduce((latest, current) =>
				current.created_at > latest.created_at ? current : latest
			);
		}
	}

	const seckey = generateSecretKey();
	const pubkey = getPublicKey(seckey);
	const event1 = finalizeEvent(
		{ kind: 0, content: JSON.stringify({ name: 'test' }), tags: [], created_at: now() },
		seckey
	);
	const event2 = finalizeEvent({ kind: 1, content: 'hello', tags: [], created_at: now() }, seckey);

	onMount(async () => {
		const nostrIDB = new NostrIDB();
		await nostrIDB.add(event1);
		await nostrIDB.add(event2);

		const metadata = await nostrIDB.replaceable(0, pubkey);
		console.log('[metadata]', metadata);
		const note = await nostrIDB.event(event2.id);
		console.log('[note]', note);
	});
</script>

<h1>Dexie.js</h1>
