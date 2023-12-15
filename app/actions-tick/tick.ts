import { tickBuildings } from '~/actions-tick/tick-buildings';
import { tickExplore } from '~/actions-tick/tick-explore';
import { tickIncome } from '~/actions-tick/tick-income';
import { tickMilitary } from '~/actions-tick/tick-military';
import { tickMoney } from '~/actions-tick/tick-money';
import { tickNetworth } from '~/actions-tick/tick-networth';
import { tickPopulation } from '~/actions-tick/tick-population';
import { tickPower } from '~/actions-tick/tick-power';
import { tickPowerIncome } from '~/actions-tick/tick-power-income';
import { tickProbes } from '~/actions-tick/tick-probes';
import { type BuildingsPlan, type KingdomFull } from '~/app.model';
import { kdUtil } from '~/kingdom';
import { mapUtil } from '~/utils';

export const tickKingdom = (kd: KingdomFull) => {
	let { status, buildings, buildingsPlan, budget, military, militaryPlan } = kd;

	status.income = tickIncome(status.pop, buildings.starMines);
	status.money = tickMoney(status.money, status.income);

	let money = status.money;

	const { explored, exploredCost } = tickExplore(status.land, (money * budget.exploration) / 100);
	status.land += explored;

	const { constructed, constructionCost } = tickBuildings(
		status.land,
		Math.floor((money * budget.construction) / 100),
		buildings,
		buildingsPlan
	);
	(Object.keys(constructed) as Array<keyof BuildingsPlan>).forEach(key => {
		buildings[key] += constructed[key];
	});

	const { nextMilitary, militaryCost } = tickMilitary(
		Math.floor((money * budget.military) / 100),
		status.pop,
		military,
		militaryPlan
	);
	military = nextMilitary;

	status.powerChange = tickPowerIncome(kd);
	status.power = tickPower(status.power, status.powerChange, kd.buildings.powerPlants);

	status.pop = tickPopulation(
		status.pop,
		buildings.residences,
		status.land,
		kdUtil.getUnsupportedMilitarySpace(military, buildings.barracks)
	);
	status.probes = tickProbes(status.probes, buildings.probeFactories);

	money -= exploredCost;
	money -= constructionCost;
	money -= militaryCost;
	status.money = money;

	status.nw = tickNetworth(kd);
	return kd;
};

export const tickNextKingdom = (kd: KingdomFull) => {
	const copy = mapUtil.toClone(kd);
	return tickKingdom(copy);
};
