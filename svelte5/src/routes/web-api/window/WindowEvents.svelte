<script lang="ts">
	const logs = $state<string[]>([]);
	let visibilityState = $state<DocumentVisibilityState | null | undefined>();

	function logEvent(event: Event): void {
		if ('Notification' in window) {
			new Notification(event.type);
		}
		logs.push(`${event.type}, ${document.visibilityState}`);
	}
</script>

<svelte:window on:visibilitychange={logEvent} on:pagehide={logEvent} on:pageshow={logEvent} />
<svelte:document bind:visibilityState />

<div>{visibilityState}</div>
<ul>
	{#each logs as log}
		<li>{log}</li>
	{/each}
</ul>
