<script lang="ts">
	import type { Action } from 'svelte/action';

	const gestures: Action<
		HTMLDivElement,
		undefined,
		{ onswipeleft: () => void; onswiperight: () => void }
	> = (node) => {
		console.log('mount', node);
		$effect(() => {
			console.log('setup');
			node.dispatchEvent(new CustomEvent('swipeleft'));
			node.dispatchEvent(new CustomEvent('swiperight'));
			return () => {
				console.log('teardown');
			};
		});
	};

	function next() {
		console.log('next');
	}

	function previous() {
		console.log('previous');
	}
</script>

<div use:gestures onswipeleft={next} onswiperight={previous}></div>
