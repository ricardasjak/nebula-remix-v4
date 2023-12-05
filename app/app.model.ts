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

export interface BudgetAllocation {
	exploration: number;
	construction: number;
	military: number;
	research: number;
}

export interface Budget extends BudgetAllocation {
	id: number;
}

export interface BuildingsBase {
	residences: number;
	starMines: number;
	barracks: number;
	powerPlants: number;
	trainingCamps: number;
	probeFactories: number;
}

export interface BuildingsAllocation extends BuildingsBase {}

export interface BuildingsPlan extends BuildingsAllocation {
	id: number;
}

export interface BuildingsBuilt extends BuildingsBase {
	id: number;
}

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

export interface MilitaryAllocation extends Omit<MilitaryBase, 'sci'> {}

export interface MilitaryPlan extends MilitaryAllocation {
	id: number;
}

export interface MilitaryBuilt extends MilitaryBase {
	id: number;
}

export interface KingdomStatus {
	id: number;
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
	buildings: BuildingsBase;
	buildingsPlan: BuildingsAllocation;
	military: MilitaryBase;
	militaryPlan: MilitaryAllocation;
};

export interface AppState {
	users: Map<number, User>;
	players: Map<number, Player>;
	kingdoms: Map<number, Kingdom>;
	kingdomsStatus: Map<number, KingdomStatus>;
	budgets: Map<number, Budget>;
	buildings: Map<number, BuildingsBuilt>;
	buildingsPlan: Map<number, BuildingsPlan>;
	military: Map<number, MilitaryBuilt>;
	militaryPlan: Map<number, MilitaryPlan>;
	status: 'empty' | 'loading' | 'ready';
}
