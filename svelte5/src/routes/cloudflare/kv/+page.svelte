<script lang="ts">
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
	}

	let { data }: Props = $props();
</script>

<h1>Cloudflare KV</h1>

<pre>{JSON.stringify(data, null, 2)}</pre>
