import { type BuildingsAllocation, type BuildingsBase } from '~/app.model';
import { GAME } from '~/game.const';
import { kdUtil } from '~/kingdom/kd.util';

const empty: BuildingsAllocation = {
	residences: 0,
	barracks: 0,
	powerPlants: 0,
	starMines: 0,
	trainingCamps: 0,
	probeFactories: 0,
};

export const tickBuildings = (
	landNext: number,
	budget: number,
	buildings: BuildingsBase,
	plan: BuildingsAllocation
) => {
	const freeLand = landNext - kdUtil.builtLand(buildings);
	if (freeLand === 0) {
		return {
			constructed: { ...empty },
			constructionCost: 0,
		};
	}

	const { cost } = GAME.building;
	const buildingCost = cost(landNext);
	const canAffordToBuild = Math.min(freeLand, Math.floor(budget / buildingCost));
	console.log({ canAffordToBuild, freeLand });

	const planned: BuildingsAllocation = (
		Object.keys(plan) as Array<keyof BuildingsAllocation>
	).reduce(
		(result, type) => {
			result[type] = (landNext * plan[type]) / 100;
			return result;
		},
		{ ...empty }
	);
	const target: BuildingsAllocation = (
		Object.keys(plan) as Array<keyof BuildingsAllocation>
	).reduce(
		(result, type) => {
			result[type] = Math.max(0, planned[type] - buildings[type]);
			return result;
		},
		{ ...empty }
	);
	const targetLand = kdUtil.builtLand(target);
	const ratio = Math.min(1, canAffordToBuild / targetLand);

	const constructed: BuildingsAllocation = (
		Object.keys(plan) as Array<keyof BuildingsAllocation>
	).reduce(
		(result, type) => {
			result[type] = Math.round(target[type] * ratio);
			return result;
		},
		{ ...empty }
	);

	return {
		constructed,
		constructionCost: buildingCost * kdUtil.builtLand(constructed),
	};
};
