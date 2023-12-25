import { type ActionFunction } from '@remix-run/node';
import { SIDES } from '~/app.model';
import { kdidLoaderFn, kingdomLoaderFn } from '~/kingdom/kingdom.loader';

export const attackActionFn: ActionFunction = async args => {
	const attackerId = await kdidLoaderFn(args);
	// const targetId = await targetLoaderFn(args);
	const attacker = await kingdomLoaderFn(attackerId);
	// const target = await kingdomLoaderFn(targetId);
	const form = await args.request.formData();

	const soldiers = Number(form.get('soldiers')) || 0;
	const troopers = Number(form.get('troopers')) || 0;
	const tanks = Number(form.get('tanks')) || 0;
	const sideStr = (form.get('side') || '') as string;
	const side = SIDES.find(s => sideStr.toLowerCase() === s);
	if (!side) {
		throw new Error('Please, select attack direction: North, East, South or West');
	}

	console.log({ side, soldiers, troopers, tanks });

	if (
		soldiers > (attacker.military.sold || 0) ||
		troopers > (attacker.military.tr || 0) ||
		tanks > (attacker.military.t || 0)
	) {
		throw new Error("You don't have that many units to send");
	}

	return { success: true };
};
