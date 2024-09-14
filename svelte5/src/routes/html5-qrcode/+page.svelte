<script lang="ts">
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { nip19 } from 'nostr-tools';
	import { onMount } from 'svelte';

	let nprofile = '';
	let pubkey = '';

	$: if (nprofile) {
		const { type, data } = nip19.decode(nprofile.substring('nostr:'.length));
		switch (type) {
			case 'npub': {
				pubkey = data;
				break;
			}
			case 'nprofile': {
				pubkey = data.pubkey;
				break;
			}
		}
	}

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

<div>{pubkey}</div>
