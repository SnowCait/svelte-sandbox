<script lang="ts">
	let items: ClipboardItem[] | undefined;

	async function onclick(): Promise<void> {
		try {
			items = await navigator.clipboard.read();
		} catch (error) {
			console.error('Failed to read clipboard:', error);
		}
	}
</script>

<h1>Clipboard</h1>

<button on:click={onclick}>Read clipboard</button>

{#if items}
	{#each items as item, index}
		<div>
			<h3>Item[{index}]</h3>
			{#each item.types as type}
				<h4>{type}</h4>
				{#await item.getType(type) then blob}
					{#if type.startsWith('image/')}
						<img src={URL.createObjectURL(blob)} alt="" width="200" height="200" />
					{:else}
						{#await blob.text() then content}
							<div>{content}</div>
						{/await}
					{/if}
				{/await}
			{/each}
		</div>
	{/each}
{/if}

<style>
	h3 {
		border-bottom: 1px solid #ccc;
	}
</style>
