<script lang="ts">
	import { sevenPairs, thirteenOrphans } from '$lib/evaluation';
	import { parseHand, sortHand } from '$lib/mahjong';

	let handString = $state('');

	let hand = $derived(sortHand(parseHand(handString)));
	let thirteenOrphansRemaining = $derived(thirteenOrphans(hand).remaining);
	let sevenPairsRemaining = $derived(sevenPairs(hand).remaining);
</script>

<h1>Mahjong</h1>

<form onsubmit={(e) => e.preventDefault()}>
	<input type="text" bind:value={handString} />
</form>

<div>
	<span>{hand.map((tile) => tile.toString()).join('')}</span>
	<span>({hand.length} 枚)</span>
</div>
{#if hand.length === 13}
	<div>
		国士無双 {#if thirteenOrphansRemaining === 1}聴牌{:else}{thirteenOrphansRemaining - 1} 向聴{/if}
	</div>
	<div>
		七対子 {#if sevenPairsRemaining === 1}聴牌{:else}{sevenPairsRemaining - 1} 向聴{/if}
	</div>
{/if}

<style>
	input {
		width: 100%;
	}
</style>
