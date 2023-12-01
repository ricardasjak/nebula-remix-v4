import {
	type AppState,
	type Budget,
	type BuildingsAllocation,
	type BuildingsBuilt,
	type BuildingsPlan,
	type KingdomFull,
	type KingdomStatus,
	type MilitaryBuilt,
	type MilitaryPlan,
} from '~/app.model';
import { GAME } from '~/game.const';
import { Military } from '~/kingdom/kingdom.model';

const getNetworth = (kd: KingdomStatus, buildings: BuildingsBuilt, military: MilitaryBuilt) => {
	const nwItems = [
		kd.pop * GAME.nw.population,
		kd.land * GAME.nw.land,
		kd.money * GAME.nw.money,
		kd.probes * GAME.nw.probes,
		builtLand(buildings) * GAME.nw.building,
		(Object.keys(military) as Array<keyof MilitaryBuilt>).reduce(
			(nw, unit) => nw + GAME.nw.military[unit] * (military[unit] || 0),
			0
		),
	];
	return nwItems.reduce((result, item) => result + item, 0);
};

const builtLand = ({ id, ...buildings }: BuildingsBuilt) => {
	return (Object.keys(buildings) as Array<keyof BuildingsAllocation>).reduce(
		(result, key) => result + buildings[key] || 0,
		0
	);
};

const getKingdomDefaults = (id: number) => {
	const budget: Budget = {
		id,
		military: 20,
		research: 20,
		exploration: 27,
		construction: 33,
	};

	const buildings: BuildingsBuilt = {
		id,
		residences: 80,
		powerPlants: 32,
		starMines: 32,
		barracks: 10,
		trainingCamps: 0,
		probeFactories: 0,
	};

	const buildingsPlan: BuildingsPlan = {
		id,
		residences: 30,
		powerPlants: 10,
		starMines: 15,
		barracks: 15,
		trainingCamps: 10,
		probeFactories: 20,
	};

	const military: MilitaryBuilt = {
		id,
		sold: 200,
		sci: 10,
	};

	const militaryPlan: MilitaryPlan = {
		id,
		sold: 100,
	};

	const kingdomStatus: KingdomStatus = {
		id,
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
	const military = (Object.keys(kd.military) as Array<keyof MilitaryBuilt>).reduce((r, unit) => {
		return r + GAME.power.military[unit] * (kd.military[unit] || 0);
	}, 0);

	const pop = kd.status.pop * GAME.power.misc.pop;
	const land = kd.status.land * GAME.power.misc.land;
	const building = kdUtil.builtLand(kd.buildings) * GAME.power.misc.building;

	return Math.ceil(military + pop + land + building);
};

export const kdUtil = {
	getNetworth,
	getKingdomDefaults,
	getFullKingdom,
	getPowerConsumption,
	builtLand,
};
