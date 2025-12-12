<script lang="ts">
	const logs = $state<string[]>([]);

	function logEvent(event: Event): void {
		if ('Notification' in window) {
			new Notification(event.type);
		}
		logs.push(`${event.type}, ${document.visibilityState}`);
	}
</script>

<svelte:window on:visibilitychange={logEvent} on:pagehide={logEvent} on:pageshow={logEvent} />

<ul>
	{#each logs as log}
		<li>{log}</li>
	{/each}
</ul>
