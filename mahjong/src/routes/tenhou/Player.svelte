<script lang="ts">
	import { num2pie, SeatWind, type Root } from '$lib/tenhou';

	let { data }: { data: Root } = $props();
	let initial = $derived(data.log[0].slice(0, 4));
	let play = $derived(data.log[0].slice(4, 4 + 4 * 3));
	let result = $derived(data.log[0][data.log[0].length - 1]);

	let current = {
		seat: SeatWind.東,
		indexes: []
	};

	function next(): void {}
</script>

<div>{JSON.stringify(data.title)}</div>
<div>{JSON.stringify(data.name)}</div>
<div>{data.rule.disp} {data.rule.aka}</div>
<div>{JSON.stringify(initial)}</div>
<div>
	{JSON.stringify(play.map((s) => s.map((t) => num2pie(t))))}
</div>
<div>東: {JSON.stringify(play[0].map((t) => num2pie(t)))}</div>
<div>南: {JSON.stringify(play[3].map((t) => num2pie(t)))}</div>
<div>西: {JSON.stringify(play[6].map((t) => num2pie(t)))}</div>
<div>北: {JSON.stringify(play[9].map((t) => num2pie(t)))}</div>
<div>{JSON.stringify(result)}</div>

<button onclick={next}>Next</button>
