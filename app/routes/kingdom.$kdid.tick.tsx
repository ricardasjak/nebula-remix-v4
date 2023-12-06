import { type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';

import { typedjson } from 'remix-typedjson';
import { kingdomTickActionFn } from '~/actions';
import { kdidLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';

export const action = async (args: ActionFunctionArgs) => {
	await kingdomTickActionFn(args);
	return typedjson({ ok: true });
};

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const next = await kingdomNextLoaderFn(kdid);
	return typedjson(next);
};
