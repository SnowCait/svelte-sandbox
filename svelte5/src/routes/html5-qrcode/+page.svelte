<script lang="ts">
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let nprofile = '';

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
			if (text.startsWith('nostr:')) {
				nprofile = text;
				scanner.pause(true);
			}
		}, undefined);
	});
</script>

<div id="reader"></div>

<div>{nprofile}</div>
