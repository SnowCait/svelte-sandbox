<script lang="ts">
	import { nip19 } from "nostr-tools";
	import { createRxForwardReq, createRxNostr, noopVerifier, uniq } from "rx-nostr";
	import { onMount } from "svelte";

    const results = ['大吉', '中吉', '小吉', '吉', '末吉', '凶', '大凶'];
    let result = '';

    const pubkey = '83d52b4363d2d1bc5a098de7be67c120bfb7c0cee8efefd8eb6e42372af24689';
    const relays = ['wss://nos.lol/', 'wss://relay.nostr.band/', 'wss://yabu.me/'];
    const rxNostr = createRxNostr({verifier: noopVerifier});
    rxNostr.setDefaultRelays(relays);

    const req = createRxForwardReq();
    rxNostr.use(req).pipe(uniq()).subscribe(({event})=>{
        console.log(event);
        // TODO: Verify receipt
        result = results[event.created_at % results.length];
    })

    onMount(()=>{
        req.emit([{kinds:[9735],'#p': [pubkey], limit:0}])
    });
</script>

<h1>Nostr 神社</h1>

<div>{result}</div>