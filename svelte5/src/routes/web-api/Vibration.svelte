{#if navigator.vibrate}
	<button onclick={() => navigator.vibrate(200)}>Vibrate</button>
{:else}
	<p>Vibration API is not supported on this device.</p>
{/if}
