import { createRxNostr } from 'rx-nostr';
import { verifier } from 'rx-nostr-crypto';

export const relays = [
	'wss://yabu.me/',
	'wss://nos.lol/',
	'wss://r.kojira.io/',
	'wss://nostream.ocha.one/',
	'wss://relay-jp.nostr.wirednet.jp/',
	'wss://nostrja-kari.heguro.com/',
	'wss://relay.nostr.band/',
	'wss://nostr.fediverse.jp/',
	'wss://relay-jp.nostr.moctane.com/',
	'wss://nrelay-jp.c-stellar.net/',
	'wss://nostr.mom/'
];

export const rxNostr = createRxNostr({ connectionStrategy: 'lazy-keep', verifier });
rxNostr.setDefaultRelays(relays);
