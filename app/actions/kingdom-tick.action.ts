import { type ActionFunction } from '@remix-run/node';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';

export const kingdomTickActionFn: ActionFunction = async args => {
	const id = kdidLoaderFn(args);
	console.log({ id });
};
