import { type Military } from '~/app.model';

const militaryNetworth: Record<keyof Military, number> = {
	sold: 3,
	tr: 6,
	dr: 7,
	lt: 7,
	ld: 8,
	sci: 8,
	// hgl: 12,
	t: 22,
	// tf: 18,
};

const militaryPower: Record<keyof Military, number> = {
	sold: 0.7,
	sci: 0.7,
	// hgl: 0.7,
	lt: 0.7,
	// tf: 1.4,
	t: 1.4,
	ld: 0.7,
	tr: 0.7,
	dr: 0.7,
};

const militaryCost: Record<keyof Military, number> = {
	sold: 150,
	tr: 350,
	lt: 400,
	sci: 1000,
	t: 1750,
	ld: 550,
	dr: 450,
	// hgl: 0.7,
	// tf: 1.4,
};

const militarySpace: Record<keyof Military, number> = {
	sold: 1,
	tr: 1,
	lt: 1,
	sci: 1,
	t: 2,
	ld: 1,
	dr: 1,
	// hgl: 0.7,
	// tf: 1.4,
};

export const GAME = {
	kingdomsLimit: 5,
	explore: {
		cost: (land: number) => Math.round(Math.pow(land, 0.4) * 111),
		canExploreByMoneyLimit: (land: number, money: number) =>
			Math.floor(money / GAME.explore.cost(land)),
		canExploreByLandLimit: (land: number) => Math.floor((land * 0.24) / 24),
	},
	building: {
		cost: (land: number) => Math.round(Math.pow(land, 0.4) * 66),
	},
	pop: {
		residenceCapacity: 50,
		residenceForMilitary: 50,
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
	probes: {
		pfOutput: 0.75,
		pfLimit: 80,
	},
	power: {
		plantOutput: 140,
		plantStorage: 1000,
		misc: {
			building: 0.25,
			land: 0.25,
			pop: 0.33,
		},
		military: militaryPower,
	},
	military: {
		cost: militaryCost,
		space: militarySpace,
		soldiersRate: (pop: number) => Math.floor((pop * 0.15) / 24),
		barrackSpace: 75,
	},
};
