<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<h1>Cloudflare KV</h1>

<pre>{JSON.stringify(data, null, 2)}</pre>
