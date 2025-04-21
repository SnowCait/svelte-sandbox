<script lang="ts">
	import { openDB } from 'idb';
	import { onMount } from 'svelte';

	onMount(async () => {
		const db = await openDB('idb-events', 1, {
			upgrade(db) {
				db.createObjectStore('events-cache', { keyPath: 'id' });
			}
		});
		await db.put('events-cache', { id: 1, name: 'test' });
		const event = await db.get('events-cache', 1);
		console.log(event);
	});
</script>
