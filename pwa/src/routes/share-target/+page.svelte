<script lang="ts">
	import { page } from '$app/state';

	const params = page.url.searchParams;
</script>

<h1>Web Share Target API</h1>

<div>{params.toString()}</div>
