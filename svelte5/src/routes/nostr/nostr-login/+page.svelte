<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		const { init } = await import('nostr-login');
		await init({
			onAuth: (npub) => {
				console.log('[on auth]', npub);
			}
		});
	});
</script>

<h1>Nostr-Login</h1>
