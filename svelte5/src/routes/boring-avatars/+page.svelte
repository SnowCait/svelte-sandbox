<script lang="ts">
	import Avatar from 'svelte-boring-avatars';

	let name = $state('');
	let colors = $derived(
		/[0-9a-fA-F]{30,}/.test(name)
			? Array.from({ length: 5 }, (_, i) => `#${name.slice(i * 6, (i + 1) * 6).toUpperCase()}`)
			: (['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'] as const)
	);

	const variants = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'];
</script>

<h1>Boring Avatars</h1>

<div>
	<input bind:value={name} placeholder="name or hex" />
</div>

<p>※ hex を入力した場合は Color に適用されます。</p>

<div>
	Color: {JSON.stringify(colors)}
</div>

<div>
	{#each variants as variant}
		<Avatar {name} {variant} {colors} />
		<Avatar {name} {variant} {colors} square={true} />
	{/each}
</div>

<style>
	input {
		width: 100%;
	}
</style>
