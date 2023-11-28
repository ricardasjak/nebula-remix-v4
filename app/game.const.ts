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
	nw: {
		land: 25,
		building: 25,
		population: 1,
		probes: 1,
		money: 1 / 500,
		military: militaryNetworth,
	},
};
