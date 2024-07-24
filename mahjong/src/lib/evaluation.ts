import { type TileKind, tileKinds, type Tile } from './mahjong';

export const groupTiles = (tiles: Tile[]): Map<TileKind, number> => {
	const groupedTiles = new Map<TileKind, number>(tileKinds.map((kind) => [kind, 0]));
	for (const tile of tiles) {
		const key = tile.kind;
		const count = groupedTiles.get(key);
		if (count === undefined) {
			throw new Error('Logic error');
		} else {
			groupedTiles.set(key, count + 1);
		}
	}
	return groupedTiles;
};

export interface Evaluation {
	remaining: number;
}

export const thirteenOrphans = (tiles: Tile[]): Evaluation => {
	const groupedTiles = groupTiles(tiles.filter((tile) => tile.isHonors() || tile.isTerminals()));
	const hasCount = [...groupedTiles].filter(([, count]) => count > 0).length;
	const doubleHasCount = [...groupedTiles].filter(([, count]) => count > 1).length;
	return {
		remaining: 14 - hasCount - (doubleHasCount > 0 ? 1 : 0)
	};
};
