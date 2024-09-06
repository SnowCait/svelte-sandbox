<script lang="ts">
	import { browser } from '$app/environment';
	import type { Nip07 } from 'nostr-typedef';
	import { onMount } from 'svelte';

	let current: Nip07.Nostr | undefined = undefined;
	let pubkey: string | undefined;

	$: console.log('[$nostr]', browser ? window.nostr : undefined);

	onMount(() => {
		if ('nostr' in window) {
			console.log('[extension]');
			current = window.nostr as Nip07.Nostr;
		} else {
			console.log('[awaiter]');
			Object.defineProperty(window, 'nostr', {
				get: () => current,
				set: (nostr) => {
					console.log('[nostr]', nostr);
					current = nostr;
				}
			});
		}
	});

	async function onClick(): Promise<void> {
		pubkey = await current?.getPublicKey();
	}

	let windowNostr = {
		isWnj: true,
		async getPublicKey(): Promise<string> {
			return 'wnj pubkey';
		}
	};

	function emulateWnj() {
		console.log('[wnj]');
		Object.defineProperty(window, 'nostr', {
			get: function () {
				return windowNostr;
			},
			set: function (v) {
				windowNostr = v;
			},
			configurable: false
		});
	}
</script>

<svelte:head>
	<script src="/window.nostr.js" defer></script>
</svelte:head>

<pre>{JSON.stringify(current, null, 2)}</pre>

<button on:click={onClick}>Get pubkey</button>

<div>{pubkey}</div>

<button on:click={emulateWnj}>Emulate wnj</button>
