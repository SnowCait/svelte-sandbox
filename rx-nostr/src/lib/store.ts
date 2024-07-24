import type { Event } from 'nostr-typedef';
import { writable } from 'svelte/store';

export const kind0Store = writable(new Map<string, Event>());
