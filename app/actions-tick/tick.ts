import { tickPopulation } from '~/actions-tick/tick-population';
import { type AppState } from '~/app.model';
import { kdUtil } from '~/kingdom/kd.util';

export const tickKingdom = (kdid: number, app: AppState) => {
	const status = app.kingdomsStatus.get(kdid)!;
	const buildings = app.buildings.get(kdid)!;

	status.pop = tickPopulation(status.pop, buildings.residences, status.land);

	//status.nw = kdUtil.getNetworth()
};
