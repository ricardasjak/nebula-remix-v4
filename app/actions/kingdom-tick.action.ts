import { type ActionFunction } from '@remix-run/node';
import { tickKingdom } from '~/actions-tick/tick';
import { kdidLoaderFn, kingdomLoaderFn } from '~/kingdom/kingdom.loader';

export const kingdomTickActionFn: ActionFunction = async args => {
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);

	tickKingdom(kd);
};
