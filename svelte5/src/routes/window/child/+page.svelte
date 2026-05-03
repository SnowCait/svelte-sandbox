<script lang="ts">
	let urls = $state<string[]>([]);

	window.addEventListener(
		'message',
		(e: MessageEvent<{ urls: string[] }>) => {
			if (e.origin !== window.origin || e.source !== window.opener) {
				return;
			}

			urls = e.data.urls;
		},
		{ once: true } // 拡張機能などから呼ばれることもあるので once にしない方がいいかも
	);
	(window.opener as Window).postMessage({ ready: true });
</script>

<h1>Window child</h1>

<div>{JSON.stringify(urls)}</div>
