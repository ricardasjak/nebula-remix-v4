import { json, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { appState } from '~/app.service';
import { type Kingdom } from '~/kingdom/kingdom.model';
import { authRequiredLoader } from '~/loaders';
import { mapUtil } from '~/utils';

/**
 * Loads kingdom data by kdid from the route params
 * @param args
 */
export const kingdomLoader = async (args: LoaderFunctionArgs) => {
	const id = kdidLoaderFn(args);
	const session = await authRequiredLoader(args);
	const { kingdom, kingdomStatus } = await kingdomLoaderFn(id, session.userId);
	return json({ kingdom, kingdomStatus });
};

export const kdidLoaderFn = (args: LoaderFunctionArgs) => {
	const id = Number(args.params.kdid);
	if (!id) {
		throw 'Kingdom not found';
	}
	return id;
};

export const kingdomLoaderFn = async (kdid: number, userId: number) => {
	const app = await appState();
	const player = mapUtil.toValues(app.players).find(p => p.userId === userId);
	if (!player || !player.kingdoms.includes(kdid)) {
		throw 'This kingdom does not belong to your account!';
	}
	const kingdom = app.kingdoms.get(kdid);
	const kingdomStatus = app.kingdomsStatus.get(kdid);
	if (!kingdom || !kingdomStatus) {
		throw 'Kingdom not found';
	}
	return { kingdom, kingdomStatus };
};
