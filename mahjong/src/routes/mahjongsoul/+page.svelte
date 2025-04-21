<script lang="ts">
	import protobuf from 'protobufjs';

	const endpoint = 'wss://jpgame.mahjongsoul.com/gateway';
	const proto = '/protocol.proto';
	let url = '';

	async function onsubmit(e: SubmitEvent): Promise<void> {
		e.preventDefault();

		console.log('URL:', url);
		const uuid = getUuid(url);
		if (!uuid) {
			console.error('Invalid URL:', url);
			return;
		}
		const data = await fetchRecord(uuid);
		console.log('Data:', data);
	}

	function getUuid(url: string): string | null {
		if (!URL.canParse(url)) {
			return null;
		}
		return new URL(url).searchParams.get('paipu')?.split('_').at(0) ?? null;
	}

	async function fetchRecord(uuid: string): Promise<void> {
		const { promise, resolve, reject } = Promise.withResolvers();

		const root = await protobuf.load(proto);
		console.log('Protobuf loaded:', root);

		const ReqGameRecord = root.lookupType('.lq.ReqGameRecord');
		const Wrapper = root.lookupType('.lq.Wrapper');
		const payload = ReqGameRecord.encode({
			gameUuid: uuid,
			clientVersionString: 'web-0.11.146'
		}).finish();
		const buffer = Wrapper.encode({ name: '.lq.Lobby.fetchGameRecord', data: payload }).finish();
		console.log(
			'Encoded buffer:',
			buffer,
			[...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')),
			new TextDecoder().decode(Uint8Array.from(buffer))
		);

		// Does not work
		return;

		const ws = new WebSocket(endpoint);
		ws.binaryType = 'arraybuffer';
		ws.addEventListener('open', async () => {
			console.log('WebSocket connection opened');
			ws.send(buffer);
		});
		ws.addEventListener('message', ({ data }) => {
			console.log(
				'WebSocket message received:',
				data,
				[...new Uint8Array(data)].map((x) => x.toString(16).padStart(2, '0')),
				new TextDecoder().decode(Uint8Array.from(data))
			);
			const ResGameRecord = root.lookupType('.lq.ResGameRecord');
			const message = ResGameRecord.decode(new Uint8Array(data));
			console.log('Decoded message:', message);
			ws.close();
			resolve(message);
		});
		ws.addEventListener('error', (error) => {
			console.error('WebSocket error:', error);
			ws.close();
			reject();
		});
		ws.addEventListener('close', () => {
			console.log('WebSocket connection closed');
		});
		await promise;
	}
</script>

<form {onsubmit}>
	<input type="url" bind:value={url} />
	<input type="submit" value="Fetch" />
</form>

<style>
	form {
		display: flex;
	}

	input[type='url'] {
		width: 80%;
	}
</style>
