import { type AppState } from '~/app.model';
import { db } from '~/services';
import { mapUtil } from '~/utils/map.util';

declare global {
	var __appState__: AppState;
}

if (!global.__appState__) {
	global.__appState__ = {
		status: 'empty',
		users: new Map(),
		players: new Map(),
		kingdoms: new Map(),
		budgets: new Map(),
	};
}

const printStatus = () => {
	const app = mapUtil.toAppStateObject(global.__appState__);
	console.log('app state');
	console.log(`app state - users count: ${app.users.length}`);
	console.log(`app state - players count: ${app.players.length}`);
	console.log(`app state - kingdoms count: ${app.kingdoms.length}`);
};

export const appState = async (): Promise<AppState> => {
	const app = global.__appState__;
	if (app.status === 'empty') {
		app.status = 'loading';
		app.users = await db.user.loadAll(app.users);
		app.players = await db.player.loadAll(app.players);
		app.kingdoms = await db.kingdom.loadAll(app.kingdoms);
		app.budgets = await db.budget.loadAll(app.budgets);
		app.status = 'ready';
	} else if (app.status === 'loading') {
		return new Promise(resolve => {
			const int = setInterval(() => {
				if (app.status === 'ready') {
					clearInterval(int);
					console.log('finally loaded');
					printStatus();
					resolve(app);
				} else {
					console.log('loading state...');
				}
			}, 100);

			setTimeout(() => {
				clearInterval(int);
			}, 5000);
		});
	}
	return app;
};
