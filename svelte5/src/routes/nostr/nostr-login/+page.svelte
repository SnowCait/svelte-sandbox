<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		document.addEventListener('nlAuth', ((event: CustomEvent) => {
			console.log('[nostr-login]', event.detail);
		}) as EventListener);
	});
</script>

<svelte:head>
	<script src="https://www.unpkg.com/nostr-login@latest/dist/unpkg.js"></script>
</svelte:head>

<h1>Nostr-Login</h1>
