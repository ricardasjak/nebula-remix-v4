import { redirect, type ActionFunction } from '@remix-run/node';
import { type Player } from '~/app.model';
import { appState } from '~/app.service';
import { canCreateKingdom } from '~/can-do/can-create-kingdom.can-do';
import { makeCoords } from '~/game-logic';
import { kdUtil } from '~/kingdom/kd.util';
import {
	type CreateKingdom,
	type Kingdom,
	type PlanetType,
	type RaceType,
} from '~/kingdom/kingdom.model';
import { authRequiredLoader } from '~/loaders';
import { routesUtil } from '~/routes.util';
import { db } from '~/services';
import { now } from '~/utils';
import { mapUtil } from '~/utils/map.util';

export const createKingdomAction: ActionFunction = async args => {
	const body = await args.request.formData();
	const kd: CreateKingdom = {
		name: body.get('name') as string,
		planet: body.get('planet') as PlanetType,
		race: body.get('race') as RaceType,
		ruler: body.get('ruler') as string,
	};
	const round = 1;
	const session = await authRequiredLoader(args);
	const app = await appState();
	const user = app.users.get(session.userId)!;

	const id = mapUtil.nextKey(app.kingdoms);
	const newKingdom: Kingdom = {
		id,
		...kd,
		created: now(),
		updated: now(),
		userId: user.id,
		galaxy: 1,
		nickname: '',
		sector: 1,
		...makeCoords(),
		roundId: round,
	};

	let player = mapUtil.toValues(app.players).find(p => p.round === round && p.userId === user.id);
	if (!player) {
		const playerId = mapUtil.nextKey(app.players);
		const newPlayer: Player = { id: playerId, userId: user.id, round: round, kingdoms: [] };
		app.players.set(playerId, newPlayer);
		player = newPlayer;
		await db.player.createOne(player.id, player);
	}

	if (!canCreateKingdom(app, player.id)) {
		throw 'Kingdoms limit reached';
	}

	app.kingdoms.set(id, newKingdom);
	player.kingdoms.push(id);

	const { budget, buildings, buildingsPlan, military, militaryPlan, kingdomStatus } =
		kdUtil.getKingdomDefaults();

	app.budgets.set(id, budget);
	app.buildings.set(id, buildings);
	app.buildingsPlan.set(id, buildingsPlan);
	app.military.set(id, military);
	app.militaryPlan.set(id, militaryPlan);
	app.kingdomsStatus.set(id, kingdomStatus);

	await db.kingdom.createOne(id, newKingdom);
	await db.player.saveOne(player.id, player);
	await db.budget.saveOne(id, budget);
	await db.buildings.saveOne(id, buildings);
	await db.buildingsPlan.saveOne(id, buildingsPlan);
	await db.military.saveOne(id, military);
	await db.militaryPlan.saveOne(id, militaryPlan);
	await db.kingdomStatus.saveOne(id, kingdomStatus);
	console.info('action: kd successfully created!');

	return redirect(routesUtil.kd.home(newKingdom.id));
};
