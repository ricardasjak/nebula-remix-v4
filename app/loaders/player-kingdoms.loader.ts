import { type LoaderFunction } from '@remix-run/node';
import { appState } from '~/app.service';
import { authLoader } from '~/loaders/auth.loader';
import { mapUtil } from '~/utils';

/**
 * Loads list of player kingdoms
 * @param args
 */
export const playerKingdomsLoader: LoaderFunction = async args => {
	const session = await authLoader(args);
	if (!session) {
		return [];
	}
	return playerKingdomsLoaderFn(session.userId);
};

export const playerKingdomsLoaderFn = async (userId: number) => {
	const app = await appState();
	const player = mapUtil.toValues(app.players).find(p => p.userId === userId);
	if (!player) {
		return [];
	}
	return player.kingdoms.map(id => app.kingdoms.get(id)!).filter(Boolean);
};

export const validatePlayerKingdom = async (userId: number, kdid: number) => {
	const kingdoms = await playerKingdomsLoaderFn(userId);
	if (!kingdoms.find(kd => kd.id === kdid)) {
		throw new Error('Kingdom not found');
	}
	return true;
};
