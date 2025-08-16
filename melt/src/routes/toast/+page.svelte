<script lang="ts">
	import { addToast } from './Toaster.svelte';

	function addNewToast() {
		addToast({
			data: {
				title: 'New Toast',
				description: 'This is a new toast notification.',
				color: 'blue'
			}
		});
	}
</script>

<h1>Toast</h1>

<button onclick={addNewToast}>Toast</button>
