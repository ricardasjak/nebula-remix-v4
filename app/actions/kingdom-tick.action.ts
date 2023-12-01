import { type ActionFunction } from '@remix-run/node';
import { tickKingdom } from '~/actions-tick/tick';
import { appState } from '~/app.service';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';

export const kingdomTickActionFn: ActionFunction = async args => {
	const kdid = kdidLoaderFn(args);
	const app = await appState();

	tickKingdom(kdid, app);
};
