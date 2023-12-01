import { tickIncome } from '~/actions-tick/tick-income';
import { tickMoney } from '~/actions-tick/tick-money';
import { tickNetworth } from '~/actions-tick/tick-networth';
import { tickPopulation } from '~/actions-tick/tick-population';
import { type AppState } from '~/app.model';

export const tickKingdom = (kdid: number, app: AppState) => {
	const status = app.kingdomsStatus.get(kdid)!;
	const buildings = app.buildings.get(kdid)!;

	status.pop = tickPopulation(status.pop, buildings.residences, status.land);
	status.income = tickIncome(status.pop, buildings.starMines);
	status.money = tickMoney(status.money, status.income);
	status.nw = tickNetworth(kdid, app);
};
