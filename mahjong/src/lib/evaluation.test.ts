import { describe, it, expect } from 'vitest';
import { parseHand, tileKinds } from './mahjong';
import { type Evaluation, groupTiles, thirteenOrphans } from './evaluation';

describe('evaluation test', () => {
	it('group tiles', () => {
		expect(groupTiles(parseHand('1m1m2m0m'))).toEqual(
			new Map<string, number>(
				tileKinds.map((kind) => [
					kind,
					kind === '1m' ? 2 : kind === '2m' ? 1 : kind === '5m' ? 1 : 0
				])
			)
		);
	});
	it('thirteen orphans', () => {
		expect(thirteenOrphans(parseHand('1m9m1p9p1s9s1z2z3z4z5z6z7z'))).toEqual({
			remaining: 1
		} satisfies Evaluation);
		expect(thirteenOrphans(parseHand('1m9m1p9p1s9s1z2z3z4z5z6z6z'))).toEqual({
			remaining: 1
		} satisfies Evaluation);
		expect(thirteenOrphans(parseHand('1m9m1p9p1s9s1z2z3z4z5z6z2m'))).toEqual({
			remaining: 2
		} satisfies Evaluation);
		expect(thirteenOrphans(parseHand('1m9m1p9p1s9s1z2z3z4z4z6z6z'))).toEqual({
			remaining: 2
		} satisfies Evaluation);
	});
});
