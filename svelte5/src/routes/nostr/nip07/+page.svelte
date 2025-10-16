<script lang="ts" module>
	import type { Nip07 } from 'nostr-typedef';

	declare global {
		interface Window {
			nostr?: Nip07.Nostr;
		}
	}
</script>

<script lang="ts">
	let content = crypto.randomUUID();
	let text = '';
	let logs: string[] = [];

	async function getPublicKey(): Promise<void> {
		const pubkey = await window.nostr?.getPublicKey();
		if (!pubkey) {
			return;
		}
		logs.push(pubkey);
		logs = logs;
	}

	async function signEvent(): Promise<void> {
		const data = {
			kind: 1,
			content,
			tags: [],
			created_at: Math.floor(Date.now() / 1000)
		};
		const event = await window.nostr?.signEvent(data);
		if (!event) {
			return;
		}
		logs.push(JSON.stringify(event));
		logs = logs;
		content = crypto.randomUUID();
	}

	async function decrypt(): Promise<void> {
		const pubkey = await window.nostr?.getPublicKey();
		if (!pubkey) {
			return;
		}
		try {
			const content = await window.nostr?.nip04?.decrypt(pubkey, text);
			if (!content) {
				return;
			}
			logs.push(content);
			logs = logs;
		} catch (error) {
			logs.push('decrypt error: ' + error);
			logs = logs;
		}
	}
</script>

<h1>
	<span>NIP-07</span>
	<a
		href="https://github.com/SnowCait/svelte-sandbox/blob/main/svelte5/src/routes/nos2x/%2Bpage.svelte"
		target="_blank"
	>
		GitHub
	</a>
</h1>

<div>
	<form onsubmit={getPublicKey}>
		<input type="submit" value="getPublicKey" />
	</form>
</div>
<hr />
<div>
	<form onsubmit={signEvent}>
		<input type="text" bind:value={content} />
		<input type="submit" value="signEvent" />
	</form>
</div>
<hr />
<div>
	<form onsubmit={decrypt}>
		<input type="text" bind:value={text} />
		<input type="submit" value="decrypt" />
	</form>
</div>
<hr />
{#each logs as log}
	<div>{log}</div>
{/each}

<style>
	a {
		font-size: 2rem;
	}

	input[type='text'] {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
