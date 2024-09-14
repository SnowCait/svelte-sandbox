<script lang="ts">
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import type { Html5QrcodeResult } from 'html5-qrcode/esm/core';
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
		scanner.render(
			(text: string, result: Html5QrcodeResult) => {
				console.log('[qr]', text, result);
			},
			(error) => console.error(error)
		);
	});
</script>

<div id="reader"></div>
