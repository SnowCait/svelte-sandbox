<svelte:options customElement="my-element" />

<script lang="ts">
	const { name = 'world' } = $props();
</script>

<h1>Hello {name}!</h1>
<slot />
