export const 局 = [
	'東1',
	'東2',
	'東3',
	'東4',
	'南1',
	'南2',
	'南3',
	'南4',
	'西1',
	'西2',
	'西3',
	'西4',
	'北1',
	'北2',
	'北3',
	'北4'
];

export const SeatWind = {
	東: 0,
	南: 1,
	西: 2,
	北: 3
} as const;

export type SeatWind = (typeof SeatWind)[keyof typeof SeatWind];

const 牌の種類: { [key: number]: string } = {
	1: 'm',
	2: 'p',
	3: 's',
	4: 'z'
};

const 牌文字列: { [key: number]: string } = {
	41: '東',
	42: '南',
	43: '西',
	44: '北',
	45: '白',
	46: '發',
	47: '中'
};

export function num2pie(n: number | string): string {
	if (typeof n === 'string') {
		return n;
	}

	switch (n) {
		case 51: {
			return '赤5m';
		}
		case 52: {
			return '赤5p';
		}
		case 53: {
			return '赤5s';
		}
		case 60: {
			return 'ツモ切り';
		}
		default: {
			const type = Math.floor(n / 10);
			const value = n % 10;
			return type === 4 ? 牌文字列[n] : `${value}${牌の種類[type]}`;
		}
	}
}

type Title = [string, string];

type Name = [string, string, string, string];

type Rule = {
	disp: string;
	aka: number;
};

export type 牌 = number;

type Info = [number, number, number];
type 点 = [number, number, number, number];
type ドラ = 牌[];

type 局 = [Info, 点, ドラ, ドラ];

export interface Root {
	title: Title;
	name: Name;
	rule: Rule;
	log: (牌 | string)[][][];
}
