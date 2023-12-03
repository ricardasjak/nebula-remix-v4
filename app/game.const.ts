import { type MilitaryBuilt } from '~/app.model';

const militaryNetworth: Record<keyof MilitaryBuilt, number> = {
	id: 0,
	sold: 3,
	tr: 6,
	dr: 7,
	lt: 7,
	ld: 8,
	sci: 8,
	hgl: 12,
	t: 22,
	tf: 18,
};

export const GAME = {
	kingdomsLimit: 10,
	explore: {
		cost: (land: number) => Math.round(Math.pow(land, 0.4) * 111),
		canExploreByMoneyLimit: (land: number, money: number) =>
			Math.floor(money / GAME.explore.cost(land)),
		canExploreByLandLimit: (land: number) => Math.floor((land * 0.24) / 24),
	},
	pop: {
		residenceCapacity: 50,
		growthRatio: 0.025,
		lossRatio: 0.05,
		lossMinimum: 100,
		lossPerLandRatio: 0.2,
	},
	nw: {
		land: 25,
		building: 25,
		population: 1,
		probes: 1,
		money: 1 / 500,
		military: militaryNetworth,
	},
	income: {
		pop: 2,
		sm: 120,
	},
	power: {
		plantOutput: 140,
		plantStorage: 1000,
		misc: {
			building: 0.25,
			land: 0.25,
			pop: 0.33,
		},
		military: {
			id: 0,
			sold: 0.7,
			sci: 0.7,
			hgl: 0.7,
			lt: 0.7,
			tf: 1.4,
			t: 1.4,
			ld: 0.7,
			tr: 0.7,
			dr: 0.7,
		} as Record<keyof MilitaryBuilt, number>,
	},
};
