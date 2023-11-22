import { type LoaderFunction } from '@remix-run/node';
import { appState } from '~/app.service';
import { authLoader } from '~/loaders/auth.loader';
import { mapUtil } from '~/utils';

export const playerKingdomsLoader: LoaderFunction = async args => {
	const session = await authLoader(args);
	if (!session) {
		return [];
	}
	const app = await appState();
	const player = mapUtil.toValues(app.players).find(p => p.userId === session.userId);
	if (!player) {
		return [];
	}
	return player.kingdoms.map(id => ({ id, name: app.kingdoms.get(id)?.name || id.toString(10) }));
};
