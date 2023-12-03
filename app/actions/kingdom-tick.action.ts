import { type ActionFunction } from '@remix-run/node';
import { tickKingdom } from '~/actions-tick/tick';
import { appState } from '~/app.service';
import { kdUtil } from '~/kingdom/kd.util';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';

export const kingdomTickActionFn: ActionFunction = async args => {
	const kdid = kdidLoaderFn(args);
	const app = await appState();
	const kd = kdUtil.getFullKingdom(kdid, app);

	tickKingdom(kd);
};
