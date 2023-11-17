import { redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { appState } from '~/app.service';
import type { CreateKingdom, Kingdom, PlanetType, RaceType } from '~/kingdom/kingdom.model';

export const createKingdomAction: ActionFunction = async ({request}) => {
	const body = await request.formData();
	const kd: CreateKingdom = {
		name: body.get('name') as string,
		planet: body.get('planet') as PlanetType,
		race: body.get('race') as RaceType,
		ruler: body.get('ruler') as string,
	}

	const app = await appState();
	const id = new Date().getTime();
	app.kingdoms.set(id, {id, ...kd} as Kingdom);
	return redirect(`/kd/create`);
}
