import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { appState } from '~/app.service';
import { mapUtil } from '~/utils/map.util';

export const getAllKingdomsLoader: LoaderFunction = async ()=> {
	const app = await appState();
	const kingdoms = mapUtil.toValues(app.kingdoms);
	return json(kingdoms);
}
