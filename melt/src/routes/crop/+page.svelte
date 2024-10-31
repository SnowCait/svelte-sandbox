<script lang="ts">
	import Cropper from 'svelte-easy-crop';

	let files: FileList | undefined;
	let url = '';

	$: if (files?.length === 1) {
		console.log('[files]', files);
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			console.log('[result]', reader.result);
			if (typeof reader.result === 'string') {
				url = reader.result;
			}
		});
		reader.readAsDataURL(files[0]);
	}

	function cropped(e: CustomEvent) {
		console.log('[crop]', e.detail);
	}
</script>

<form on:submit|preventDefault>
	<input type="file" bind:files />
</form>

<div>
	<Cropper image={url} aspect={1} maxZoom={10} on:cropcomplete={cropped} />
</div>

<style>
	div {
		position: relative;
		width: 200px;
		height: 200px;
	}
</style>
