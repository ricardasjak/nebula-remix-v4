import { type Kingdom } from '~/kingdom';

export interface UserSession {
	userId: number;
	clerkUserId: string;
	email: string;
}

export interface User {
	id: number;
	clerkUserId?: string;
	email: string;
	lastActiveAt?: string;
}

export interface Player {
	id: number;
	userId: number;
	round: number;
	kingdoms: number[];
}

export interface Budget {
	exploration: number;
	construction: number;
	military: number;
	research: number;
}

export interface Buildings {
	residences: number;
	starMines: number;
	barracks: number;
	powerPlants: number;
	trainingCamps: number;
	probeFactories: number;
}

export interface BuildingsPlan extends Buildings {}

export interface BuildingsBuilt extends Buildings {}

export interface MilitaryBase {
	sold?: number;
	lt?: number;
	ld?: number;
	tr?: number;
	dr?: number;
	t?: number;
	hgl?: number;
	tf?: number;
	sci?: number;
}

export interface MilitaryPlan extends Omit<MilitaryBase, 'sci'> {}

export interface Military extends MilitaryBase {}

export interface KingdomStatus {
	pop: number;
	money: number;
	income: number;
	nw: number;
	land: number;
	power: number;
	powerChange: number;
	probes: number;
}

export type KingdomFull = {
	kingdom: Kingdom;
	status: KingdomStatus;
	budget: Budget;
	buildings: Buildings;
	buildingsPlan: BuildingsPlan;
	military: MilitaryBase;
	militaryPlan: MilitaryPlan;
};

export interface AppState {
	users: Map<number, User>;
	players: Map<number, Player>;
	kingdoms: Map<number, Kingdom>;
	kingdomsStatus: Map<number, KingdomStatus>;
	budgets: Map<number, Budget>;
	buildings: Map<number, BuildingsBuilt>;
	buildingsPlan: Map<number, BuildingsPlan>;
	military: Map<number, Military>;
	militaryPlan: Map<number, MilitaryPlan>;
	status: 'empty' | 'loading' | 'ready';
}
