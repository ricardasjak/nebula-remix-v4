import {
	type AppState,
	type Budget,
	type Buildings,
	type BuildingsPlan,
	type KingdomFull,
	type KingdomStatus,
	type Military,
	type MilitaryPlan,
} from '~/app.model';
import { GAME } from '~/game.const';
import { type WorldKingdom } from '~/loaders';

const getNetworth = (kd: KingdomStatus, buildings: Buildings, military: Military) => {
	const nwItems = [
		kd.pop * GAME.nw.population,
		kd.land * GAME.nw.land,
		kd.money * GAME.nw.money,
		kd.probes * GAME.nw.probes,
		builtLand(buildings) * GAME.nw.building,
		(Object.keys(military) as Array<keyof Military>).reduce(
			(nw, unit) => nw + GAME.nw.military[unit] * (military[unit] || 0),
			0
		),
	];
	return nwItems.map(Math.floor).reduce((result, item) => result + (item || 0), 0);
};

const builtLand = (buildings: BuildingsPlan) => {
	return (Object.keys(buildings) as Array<keyof BuildingsPlan>).reduce(
		(result, key) => result + buildings[key] || 0,
		0
	);
};

const getKingdomDefaults = (id: number) => {
	const budget: Budget = {
		military: 20,
		research: 20,
		exploration: 27,
		construction: 33,
	};

	const buildings: Buildings = {
		residences: 80,
		powerPlants: 32,
		starMines: 32,
		barracks: 10,
		trainingCamps: 0,
		probeFactories: 0,
	};

	const buildingsPlan: BuildingsPlan = {
		residences: 30,
		powerPlants: 10,
		starMines: 15,
		barracks: 15,
		trainingCamps: 10,
		probeFactories: 20,
	};

	const military: Military = {
		sold: 200,
		sci: 10,
	};

	const militaryPlan: MilitaryPlan = {
		sold: 100,
	};

	const kingdomStatus: KingdomStatus = {
		pop: 2250,
		land: 250,
		nw: 0,
		probes: 1000,
		money: 225_000,
		power: 1_000,
		income: 0,
		powerChange: 0,
	};
	kingdomStatus.nw = kdUtil.getNetworth(kingdomStatus, buildings, military);

	return {
		budget,
		buildings,
		buildingsPlan,
		military,
		militaryPlan,
		kingdomStatus,
	};
};

const getFullKingdom = (id: number, app: AppState): KingdomFull => {
	return {
		kingdom: app.kingdoms.get(id)!,
		status: app.kingdomsStatus.get(id)!,
		buildings: app.buildings.get(id)!,
		buildingsPlan: app.buildingsPlan.get(id)!,
		military: app.military.get(id)!,
		militaryPlan: app.militaryPlan.get(id)!,
		budget: app.budgets.get(id)!,
	};
};

const getPowerConsumption = (kd: KingdomFull): number => {
	const military = (Object.keys(kd.military) as Array<keyof Omit<Military, 'id'>>).reduce(
		(r, unit) => {
			return r + GAME.power.military[unit] * (kd.military[unit] || 0);
		},
		0
	);

	const pop = kd.status.pop * GAME.power.misc.pop;
	const land = kd.status.land * GAME.power.misc.land;
	const building = kdUtil.builtLand(kd.buildings) * GAME.power.misc.building;

	return Math.ceil(military + pop + land + building);
};

// const getPublicKingdomProfile = (kdid: number, app: AppState) => {
// 	const {kingdom: {name, }, status} = getFullKingdom(kdid, app);
// 	return {
//
// 	}
// }

const getWorldKingdom = (kdid: number, app: AppState): WorldKingdom => {
	const {
		kingdom: { name, x, y, planet, race },
		status: { land, nw },
	} = getFullKingdom(kdid, app);

	return {
		id: kdid,
		name,
		x,
		y,
		planet,
		race,
		land,
		nw,
	};
};

export const kdUtil = {
	getNetworth,
	getKingdomDefaults,
	getFullKingdom,
	getPowerConsumption,
	getWorldKingdom,
	builtLand,
};
