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
			const content = await window.nostr?.nip04?.decrypt(pubkey, '');
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

<h1>nos2x</h1>

<p>
	Once decrypt fails, nos2x hangs and all subsequent methods do not return anything.
	<br />
	(e.g. decrypt &gt; signEvent)
	<br />
	This does not resolve until nos2x is restarted.
</p>
<p></p>

<div>
	<form onsubmit={getPublicKey}>
		<input type="submit" value="getPublicKey" />
	</form>
</div>
<hr />
<div>
	<form onsubmit={signEvent}>
		<input type="text" bind:value={content} placeholder="content" />
		<input type="submit" value="signEvent" />
	</form>
</div>
<hr />
<div>
	<button onclick={decrypt}>decrypt (error)</button>
</div>
<hr />
{#each logs as log}
	<div>{log}</div>
{/each}

<style>
	input[type='text'] {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
