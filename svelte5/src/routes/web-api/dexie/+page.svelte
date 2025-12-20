<script lang="ts">
	import Dexie, { type Table } from 'dexie';
	import type { Event } from 'nostr-tools';
	import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools';
	import { now } from 'rx-nostr';
	import { onMount } from 'svelte';

	class NostrDatabase extends Dexie {
		events!: Table<Event, string>;

		constructor() {
			super('dexie-test');
			this.version(1).stores({
				events: 'id, kind, pubkey, created_at, [kind+pubkey]'
			});
		}
	}

	class NostrIDB {
		private db: NostrDatabase;

		constructor(db: NostrDatabase) {
			this.db = db;
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
		const db = new NostrDatabase();
		console.log(db);
		const nostrIDB = new NostrIDB(db);
		await nostrIDB.add(event1);
		await nostrIDB.add(event2);

		const metadata = await nostrIDB.replaceable(0, pubkey);
		console.log('[metadata]', metadata);
		const note = await nostrIDB.event(event2.id);
		console.log('[note]', note);
	});
</script>

<h1>Dexie.js</h1>
