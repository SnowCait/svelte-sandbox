<script lang="ts">
	import { openDB, type IDBPDatabase } from 'idb';
	import type { Event } from 'nostr-tools';
	import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools';
	import { now } from 'rx-nostr';
	import { onMount } from 'svelte';

	const STORE_NAME = 'events';

	// nostr-idbと同じ構造のクラス
	class NostrIDB {
		private db: IDBPDatabase;

		constructor(db: IDBPDatabase) {
			this.db = db;
		}

		async add(event: Event) {
			await this.db.put(STORE_NAME, event);
		}

		async event(id: string): Promise<Event | undefined> {
			return await this.db.get(STORE_NAME, id);
		}

		async replaceable(kind: number, pubkey: string): Promise<Event | undefined> {
			const tx = this.db.transaction(STORE_NAME, 'readonly');
			const store = tx.store;

			const all = await store.getAll();
			await tx.done;

			const filtered = all.filter((event) => event.kind === kind && event.pubkey === pubkey);
			if (filtered.length === 0) return undefined;

			return filtered.reduce((latest, current) =>
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
		const db = await openDB('idb-test', 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains(STORE_NAME)) {
					const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
					store.createIndex('kind', 'kind');
					store.createIndex('pubkey', 'pubkey');
					store.createIndex('created_at', 'created_at');
					store.createIndex('kind-pubkey', ['kind', 'pubkey']);
				}
			}
		});
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

<h1>idb</h1>
