<script lang="ts">
	import { get, set } from 'idb-keyval';
	import { onMount } from 'svelte';

	onMount(async () => {
		await set('test', { id: 1, name: 'test' });
		const event = await get('test');
		console.log(event);
	});
</script>
