<script lang="ts">
	import { num2pie, SeatWind, type Root, type 牌 } from '$lib/tenhou';

	let { data }: { data: Root } = $props();
	let initial = $derived(data.log[0].slice(0, 4));
	let play = $derived(data.log[0].slice(4, 4 + 4 * 3));
	let result = $derived(data.log[0][data.log[0].length - 1]);

	let current = {
		seat: 0,
		indexes: [-1]
	};

	function next(): void {
		const 牌 = ツモ(current.seat);
		const 捨て牌 = 打牌(current.seat);
	}

	function ツモ(player: number): 牌 {
		return play[player * 3 + 1][0] as 牌;
	}

	function 打牌(player: number): 牌 | string {
		return play[player * 3 + 2][0];
	}
</script>

<div>{JSON.stringify(data.title)}</div>
<div>{JSON.stringify(data.name)}</div>
<div>{data.rule.disp} {data.rule.aka}</div>
<div>{JSON.stringify(initial)}</div>
<div>東（配牌）: {JSON.stringify(play[0].map((t) => num2pie(t)))}</div>
<div>東（ツモ牌）: {JSON.stringify(play[1].map((t) => num2pie(t)))}</div>
<div>東（捨て牌）: {JSON.stringify(play[2].map((t) => num2pie(t)))}</div>
<div>南（配牌）: {JSON.stringify(play[3].map((t) => num2pie(t)))}</div>
<div>南（ツモ牌）: {JSON.stringify(play[4].map((t) => num2pie(t)))}</div>
<div>南（捨て牌）: {JSON.stringify(play[5].map((t) => num2pie(t)))}</div>
<div>西（配牌）: {JSON.stringify(play[6].map((t) => num2pie(t)))}</div>
<div>西（ツモ牌）: {JSON.stringify(play[7].map((t) => num2pie(t)))}</div>
<div>西（捨て牌）: {JSON.stringify(play[8].map((t) => num2pie(t)))}</div>
<div>北（配牌）: {JSON.stringify(play[9].map((t) => num2pie(t)))}</div>
<div>北（ツモ牌）: {JSON.stringify(play[10].map((t) => num2pie(t)))}</div>
<div>北（捨て牌）: {JSON.stringify(play[11].map((t) => num2pie(t)))}</div>
<div>{JSON.stringify(result)}</div>

<button onclick={next}>Next</button>
