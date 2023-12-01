import { GAME } from '~/game.const';

export const tickPopulation = (currentPopulation: number, residences: number, land: number) => {
	const { growthRatio, residenceCapacity, lossRatio, lossPerLandRatio, lossMinimum } = GAME.pop;
	const maxPop = residences * residenceCapacity;

	let result = currentPopulation;
	if (maxPop >= currentPopulation) {
		const maxGrowth = currentPopulation * growthRatio;
		result = Math.min(currentPopulation + maxGrowth, maxPop);
	} else {
		const maxLoss = Math.max(currentPopulation * lossRatio, land * lossPerLandRatio, lossMinimum);
		result = currentPopulation - maxLoss;
	}
	return Math.round(result);
};
