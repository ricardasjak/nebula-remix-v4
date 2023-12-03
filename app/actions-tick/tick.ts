import { tickIncome } from '~/actions-tick/tick-income';
import { tickMoney } from '~/actions-tick/tick-money';
import { tickNetworth } from '~/actions-tick/tick-networth';
import { tickPopulation } from '~/actions-tick/tick-population';
import { tickPower } from '~/actions-tick/tick-power';
import { tickPowerIncome } from '~/actions-tick/tick-power-income';
import { type KingdomFull } from '~/app.model';
import { mapUtil } from '~/utils';

export const tickKingdom = (kd: KingdomFull) => {
	const status = kd.status;
	const buildings = kd.buildings;

	status.pop = tickPopulation(status.pop, buildings.residences, status.land);
	status.income = tickIncome(status.pop, buildings.starMines);
	status.money = tickMoney(status.money, status.income);

	status.powerChange = tickPowerIncome(kd);
	status.power = tickPower(status.power, status.powerChange, kd.buildings.powerPlants);

	status.nw = tickNetworth(kd);
	return kd;
};

export const tickNextKingdom = (kd: KingdomFull) => {
	const copy = mapUtil.toClone(kd);
	return tickKingdom(copy);
};
