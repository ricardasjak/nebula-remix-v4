import { type AppState } from '~/app.model';
import { db } from '~/services';
import { mapUtil } from '~/utils/map.util';

declare global {
	var __appState__: AppState;
}

if (!global.__appState__) {
	global.__appState__ = {
		status: 'empty',
		rounds: new Map(),
		users: new Map(),
		players: new Map(),
		kingdoms: new Map(),
		kingdomsStatus: new Map(),
		budgets: new Map(),
		buildings: new Map(),
		buildingsPlan: new Map(),
		defence: new Map(),
		military: new Map(),
		militaryPlan: new Map(),
	};
}

export const printStatus = () => {
	const app = mapUtil.toAppStateObject(global.__appState__);
	const summary = [
		'app state',
		`app state - rounds count: ${app.rounds.length}`,
		`app state - users count: ${app.users.length}`,
		`app state - players count: ${app.players.length}`,
		`app state - kingdoms count: ${app.kingdoms.length}`,
		`app state - kingdoms status count: ${app.status.length}`,
		`app state - budgets count: ${app.budgets.length}`,
		`app state - buildings count: ${app.buildings.length}`,
		`app state - buildingsPlan count: ${app.buildingsPlan.length}`,
		`app state - defence count: ${app.defence.length}`,
		`app state - military count: ${app.military.length}`,
		`app state - militaryPlan count: ${app.militaryPlan.length}`,
	].join('\n');
	console.info(summary);
	return summary;
};

export const appState = async (): Promise<AppState> => {
	const app = global.__appState__;
	if (app.status === 'empty') {
		app.status = 'loading';
		try {
			app.rounds = await db.round.loadAll(app.rounds);
			app.users = await db.user.loadAll(app.users);
			app.players = await db.player.loadAll(app.players);
			app.kingdoms = await db.kingdom.loadAll(app.kingdoms);
			app.kingdomsStatus = await db.kingdomStatus.loadAll(app.kingdomsStatus);
			app.defence = await db.defence.loadAll(app.defence);
			app.budgets = await db.budget.loadAll(app.budgets);
			app.buildings = await db.buildings.loadAll(app.buildings);
			app.buildingsPlan = await db.buildingsPlan.loadAll(app.buildingsPlan);
			app.military = await db.military.loadAll(app.military);
			app.militaryPlan = await db.militaryPlan.loadAll(app.militaryPlan);
			app.status = 'ready';
		} catch (ex) {
			console.error(ex);
		}
	} else if (app.status === 'loading') {
		return new Promise(resolve => {
			const int = setInterval(() => {
				if (app.status === 'ready') {
					clearInterval(int);
					console.info('finally loaded');
					printStatus();
					resolve(app);
				} else {
					console.info('loading state...');
				}
			}, 1000);

			setTimeout(() => {
				clearInterval(int);
			}, 5000);
		});
	}
	return app;
};
