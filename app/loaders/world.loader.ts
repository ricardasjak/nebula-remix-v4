import { json, type LoaderFunction } from '@remix-run/node';
import { appState } from '~/app.service';
import { mapUtil } from '~/utils/map.util';

export interface WorldKingdom {
	id: number;
	name: string;
	x: number;
	y: number;
	land: number;
	nw: number;
}

export const worldLoader: LoaderFunction = async () => {
	const app = await appState();
	const kingdoms = mapUtil.toValues(app.kingdoms);
	const result: WorldKingdom[] = kingdoms.map(({ id, name, x, y, land, nw }) => ({
		id,
		name,
		x,
		y,
		land,
		nw,
	}));
	return json(result);
};
