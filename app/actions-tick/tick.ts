import { tickIncome } from '~/actions-tick/tick-income';
import { tickMoney } from '~/actions-tick/tick-money';
import { tickNetworth } from '~/actions-tick/tick-networth';
import { tickPopulation } from '~/actions-tick/tick-population';
import { tickPower } from '~/actions-tick/tick-power';
import { tickPowerIncome } from '~/actions-tick/tick-power-income';
import { type AppState } from '~/app.model';
import { kdUtil } from '~/kingdom/kd.util';

export const tickKingdom = (kdid: number, app: AppState) => {
	const kd = kdUtil.getFullKingdom(kdid, app);
	const status = app.kingdomsStatus.get(kdid)!;
	const buildings = app.buildings.get(kdid)!;

	status.pop = tickPopulation(status.pop, buildings.residences, status.land);
	status.income = tickIncome(status.pop, buildings.starMines);
	status.money = tickMoney(status.money, status.income);

	status.powerChange = tickPowerIncome(kd);
	status.power = tickPower(status.power, status.powerChange, kd.buildings.powerPlants);

	status.nw = tickNetworth(kd);
};
