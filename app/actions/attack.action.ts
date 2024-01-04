import { type ActionFunctionArgs } from '@remix-run/node';
import { type Attack, type AttackNews, type Military } from '~/app.model';
import { appState } from '~/app.service';
import { GAME } from '~/game.const';

import { kdidLoaderFn, kingdomLoaderFn, targetLoaderFn } from '~/kingdom/kingdom.loader';
import { db } from '~/services';
import { mapUtil, militaryUtil, now, randomNumber } from '~/utils';

export const attackActionFn = async (args: ActionFunctionArgs) => {
	const attackerId = await kdidLoaderFn(args);
	const targetId = await targetLoaderFn(args);
	const attacker = await kingdomLoaderFn(attackerId);
	const defender = await kingdomLoaderFn(targetId);
	const form = await args.request.formData();

	const soldiers = Number(form.get('soldiers')) || 0;
	const troopers = Number(form.get('troopers')) || 0;
	const tanks = Number(form.get('tanks')) || 0;
	// const sideStr = (form.get('side') || '') as string;
	// const side = SIDES.find(s => sideStr.toLowerCase() === s);
	// if (!side) {
	// 	throw new Error('Please, select attack direction: North, East, South or West');
	// }

	if (
		soldiers > (attacker.military.sold || 0) ||
		troopers > (attacker.military.tr || 0) ||
		tanks > (attacker.military.t || 0)
	) {
		throw new Error("You don't have that many units to send");
	}

	if (attacker.status.attackMeter < GAME.military.attackMeterMax) {
		throw new Error(
			`Your attack meter ${attacker.status.attackMeter}% hasn't reached required value of ${GAME.military.attackMeterMax}%. Advance few more ticks before trying again.`
		);
	}

	const app = await appState();

	const attackerMilitary: Military = {
		sold: soldiers,
		tr: troopers,
		t: tanks,
		sci: undefined,
		ld: undefined,
		dr: undefined,
		lt: undefined,
	};

	const attackerPoints = militaryUtil.getAttackerPoints(
		attackerMilitary,
		attacker.status.power === 0
	);
	const defenderPoints = militaryUtil.getDefensePoints(
		defender.military,
		defender.status.power === 0
	);
	const successPercentage = militaryUtil.getAttackSuccessChance(attackerPoints, defenderPoints);
	const successNumber = randomNumber();
	const success = successPercentage >= successNumber;

	const attackerLossesRatio = militaryUtil.getAttackLossRatio(
		attackerPoints,
		defenderPoints,
		success
	);
	const attackerLosses = militaryUtil.getAttackerLostUnits(attackerMilitary, attackerLossesRatio);

	const defenderLossesRatio = militaryUtil.getDefenderLossRatio(
		attackerPoints,
		defenderPoints,
		success
	);
	const defenderMilitary = { ...defender.military };
	const defenderLosses = militaryUtil.getDefenderLostUnits(defenderMilitary, defenderLossesRatio);

	const grabRatio = militaryUtil.getGrabRatio(attackerPoints, defenderPoints, 0);
	const gains = success
		? militaryUtil.getGains(defender.status, defenderMilitary.sci || 0, grabRatio)
		: undefined;

	// register attack
	const attack: Attack = {
		attackerId,
		targetId,
		createdAt: now(),
		success,
		successNumber,
		successPercentage,
		gains,

		attackerPoints,
		attackerMilitary,
		attackerLosses,

		defenderPoints,
		defenderMilitary,
		defenderLosses,
	};

	militaryUtil.deductLosses(defender.military, defenderLosses);
	militaryUtil.deductLosses(attacker.military, attackerLosses);

	if (success && gains) {
		militaryUtil.addGains(attacker.status, attacker.military, gains, 1);
		militaryUtil.addGains(defender.status, defender.military, gains, -1);
	}

	// reduce attacking meter
	attacker.status.attackMeter = 0;

	// register attack
	const attacks = app.attacks.get(attackerId)!;
	const attackId = mapUtil.nextKey(attacks); // attacker.status.probings; //new Date().getTime(); //
	attacks.set(attackId, attack);
	void db.attacks(attackerId).createOne(attackId, attack);

	// register target's news
	const targetNews = app.news.get(targetId)!;
	const newsId = mapUtil.nextKey(targetNews);

	const attackNews: AttackNews = { id: newsId, attackId, attackerId };
	targetNews.set(newsId, attackNews);
	void db.news(targetId).createOne(newsId, attackNews);

	return { attack };
};
