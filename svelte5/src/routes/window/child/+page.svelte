<script lang="ts">
	let urls = $state<string[]>([]);

	window.addEventListener(
		'message',
		(e: MessageEvent<{ urls: string[] }>) => {
			console.log(e);
			if (e.origin !== window.origin) {
				return;
			}

			urls = e.data.urls;
		},
		{ once: true }
	);
	(window.opener as Window).postMessage({ ready: true });
</script>

<h1>Window child</h1>

<div>{JSON.stringify(urls)}</div>
