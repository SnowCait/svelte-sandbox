<script lang="ts">
	import { goto } from '$app/navigation';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onMount } from 'svelte';

	onMount(() => {
		const scanner = new Html5QrcodeScanner(
			'reader',
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			false
		);
		scanner.render((text: string) => {
			console.log('[qr]', text);
			if (text.startsWith('nostr:npub')) {
				scanner.pause(true);
				goto(`https://nostter.app/${text.substring('nostr:'.length)}`);
			}
		}, undefined);
	});
</script>

<div id="reader"></div>
