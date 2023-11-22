import { json, type LoaderFunction } from '@remix-run/node';
import { appState } from '~/app.service';
import { type Kingdom } from '~/kingdom/kingdom.model';
import { authRequiredLoader } from '~/loaders';
import { mapUtil } from '~/utils';

export const kingdomLoader: LoaderFunction = async args => {
	const id = Number(args.params.kdid);
	const session = await authRequiredLoader(args);
	if (!id || !session) {
		throw 'Kingdom not found';
	}
	const app = await appState();
	const player = mapUtil.toValues(app.players).find(p => p.userId === session.userId);
	if (!player || !player.kingdoms.includes(id)) {
		throw 'This kingdom does not belong to your account!';
	}
	const kd = app.kingdoms.get(id);
	if (!kd) {
		throw 'Kingdom not found';
	}
	return json<Kingdom>(kd);
};
