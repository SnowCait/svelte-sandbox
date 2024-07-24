import { describe, it, expect } from 'vitest';
import { parseHand, sortHand, Tile } from './mahjong';

describe('mahjong test', () => {
	it('tile', () => {
		expect(Tile.parse('1m')).toEqual(new Tile('m', 1));
		expect(() => Tile.parse('1')).toThrowError();
	});
	it('tile is terminals', () => {
		expect(new Tile('m', 1).isTerminals()).toBe(true);
		expect(new Tile('m', 2).isTerminals()).toBe(false);
		expect(new Tile('z', 1).isTerminals()).toBe(false);
	});
	it('tile is honors', () => {
		expect(new Tile('z', 1).isHonors()).toBe(true);
		expect(new Tile('m', 1).isHonors()).toBe(false);
	});
	it('parse hand', () => {
		expect(parseHand('1m')).toEqual([new Tile('m', 1)]);
		expect(parseHand('1m0m')).toEqual([new Tile('m', 1), new Tile('m', 5, true)]);
	});
	it('sort hand', () => {
		expect(sortHand(parseHand('2m1m3m'))).toEqual([
			new Tile('m', 1),
			new Tile('m', 2),
			new Tile('m', 3)
		]);
		expect(sortHand(parseHand('1z1m1s1p'))).toEqual([
			new Tile('m', 1),
			new Tile('p', 1),
			new Tile('s', 1),
			new Tile('z', 1)
		]);
		expect(sortHand(parseHand('2m1m3m0m9m3m'))).toEqual([
			new Tile('m', 1),
			new Tile('m', 2),
			new Tile('m', 3),
			new Tile('m', 3),
			new Tile('m', 5, true),
			new Tile('m', 9)
		]);
	});
});
