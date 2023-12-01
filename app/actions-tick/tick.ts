import { tickNetworth } from '~/actions-tick/tick-networth';
import { tickPopulation } from '~/actions-tick/tick-population';
import { type AppState } from '~/app.model';

export const tickKingdom = (kdid: number, app: AppState) => {
	const status = app.kingdomsStatus.get(kdid)!;
	const buildings = app.buildings.get(kdid)!;

	status.pop = tickPopulation(status.pop, buildings.residences, status.land);
	status.nw = tickNetworth(kdid, app);
};
