import { type ActionFunction } from '@remix-run/node';
import { tickKingdom } from '~/actions-tick/tick';
import { appState } from '~/app.service';
import { kdidLoaderFn, kingdomLoaderFn } from '~/kingdom/kingdom.loader';
import { gameUtil } from '~/utils';

export const kingdomTickActionFn: ActionFunction = async args => {
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);

	const maxTick = gameUtil(await appState()).getTicksLimit();
	if ((kd.status.tick || 1) > maxTick) {
		throw new Error('You cannot tick over the limit');
	}

	tickKingdom(kd);
};
