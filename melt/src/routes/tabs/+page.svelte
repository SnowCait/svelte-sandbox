<script lang="ts">
	import { createTabs, melt } from '@melt-ui/svelte';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs();

	const triggers = [
		{ id: 'tab-1', title: 'Tab 1' },
		{ id: 'tab-2', title: 'Tab 2' },
		{ id: 'tab-3', title: 'Tab 3' }
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div use:melt={$root}>
	<div use:melt={$list}>
		{#each triggers as triggerItem}
			<button use:melt={$trigger(triggerItem.id)}>
				{triggerItem.title}
				{#if $value === triggerItem.id}
					<div in:send={{ key: 'trigger' }} out:receive={{ key: 'trigger' }}>-</div>
				{:else}
					<div>&nbsp;</div>
				{/if}
			</button>
		{/each}
	</div>
	<div use:melt={$content('tab-1')}>Tab 1</div>
	<div use:melt={$content('tab-2')}>Tab 2</div>
	<div use:melt={$content('tab-3')}>Tab 3</div>
</div>
