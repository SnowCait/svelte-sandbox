<script lang="ts">
	function onclick() {
		const popup = window.open(
			'/window/child',
			'_blank',
			[
				'popup=true',
				`width=${window.screen.availWidth}`,
				`height=${window.screen.availHeight}`
			].join(',')
		);

		if (popup === null) {
			return;
		}

		window.addEventListener(
			'message',
			(e: MessageEvent<{ ready: boolean }>) => {
				if (e.origin !== window.origin || e.source !== popup) {
					return;
				}

				if (e.data.ready) {
					popup?.postMessage({ urls: ['https://example.com/'] }, window.origin);
				}
			},
			{ once: true }
		);
	}
</script>

<h1>Window parent</h1>

<button {onclick}>Open</button>
