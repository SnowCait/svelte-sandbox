export const Suits = ['m', 'p', 's', 'z'] as const;
export type Suit = (typeof Suits)[number];

export const Values = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type Value = (typeof Values)[number];

export type TileKind = string;

export class Tile {
	constructor(
		public readonly suit: Suit,
		public readonly value: Value,
		public readonly red: boolean = false
	) {}

	get kind(): TileKind {
		return `${this.value}${this.suit}`;
	}

	isTerminals(): boolean {
		return this.suit !== 'z' && [1, 9].includes(this.value);
	}

	isHonors(): boolean {
		return this.suit === 'z';
	}

	toString(): string {
		return `${this.red ? 0 : this.value}${this.suit}`;
	}

	static parse(tileString: string): Tile {
		if (tileString.length !== 2) {
			throw new Error('Failed to parse tile.');
		}
		const value = Number(tileString[0]);
		const suite = tileString[1] as Suit;
		if (value > 0) {
			return new Tile(suite, value as Value);
		} else {
			return new Tile(suite, 5, true);
		}
	}
}

export const tileKinds = Suits.flatMap((suit) =>
	Values.slice(0, suit === 'z' ? 7 : 9).map((v) => `${v}${suit}`)
);

export const parseHand = (hand: string): Tile[] => {
	const matches = hand.matchAll(/[0-9][m|p|s|z]/g);
	return [...matches].map(([tileString]) => Tile.parse(tileString));
};

export const sortHand = (tiles: Tile[]): Tile[] => {
	const suitOrder: { [key in Suit]: number } = { m: 1, p: 2, s: 3, z: 4 };
	return tiles.toSorted((x, y) => {
		if (x.suit !== y.suit) {
			return suitOrder[x.suit] - suitOrder[y.suit];
		} else {
			return x.value - y.value;
		}
	});
};
