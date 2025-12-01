<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		const { init } = await import('nostr-login');
		await init({
			onAuth: (npub, options) => {
				console.log('[on auth]', npub, options);
			}
		});
	});
</script>

<h1>Nostr-Login</h1>
