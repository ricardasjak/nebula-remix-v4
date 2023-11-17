import { redirect, type ActionFunction } from '@remix-run/node';
import { appState } from '~/app.service';
import {
	type CreateKingdom,
	type Kingdom,
	type PlanetType,
	type RaceType,
} from '~/kingdom/kingdom.model';

export const createKingdomAction: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const kd: CreateKingdom = {
		name: body.get('name') as string,
		planet: body.get('planet') as PlanetType,
		race: body.get('race') as RaceType,
		ruler: body.get('ruler') as string,
	};

	const app = await appState();
	const id = new Date().getTime();
	app.kingdoms.set(id, { id, ...kd } as Kingdom);
	return redirect(`/kd/create`);
};
