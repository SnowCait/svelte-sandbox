<script lang="ts" module>
	// https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/236

	declare const navigator: Navigator & NavigatorBatteryStatus;

	interface NavigatorBatteryStatus {
		getBattery(): Promise<BatteryManager>;
	}

	interface BatteryManager extends BatteryManagerEventTarget {
		readonly charging: boolean;
		readonly chargingTime: number;
		readonly dischargingTime: number;
		readonly level: number;
	}

	interface BatteryManagerEventTargetEventMap {
		chargingchange: Event;
		chargingtimechange: Event;
		dischargingtimechange: Event;
		levelchange: Event;
	}

	interface BatteryManagerEventTarget extends EventTarget {
		onchargingchange: (this: BatteryManager, ev: Event) => any;
		onlevelchange: (this: BatteryManager, ev: Event) => any;
		onchargingtimechange: (this: BatteryManager, ev: Event) => any;
		ondischargingtimechange: (this: BatteryManager, ev: Event) => any;
		addEventListener<K extends keyof BatteryManagerEventTargetEventMap>(
			type: K,
			listener: (this: BatteryManager, ev: BatteryManagerEventTargetEventMap[K]) => any,
			useCapture?: boolean
		): void;
	}

	console.log('getBattery' in navigator);
</script>

<h1>Battery</h1>

<div>{'getBattery' in navigator}</div>
{#if 'getBattery' in navigator}
	{#await navigator.getBattery() then battery}
		<div>charging: {battery.charging}</div>
		<div>chargingTime: {battery.chargingTime}</div>
		<div>dischargingTime: {battery.dischargingTime}</div>
		<div>level: {battery.level}</div>
	{/await}
{/if}
