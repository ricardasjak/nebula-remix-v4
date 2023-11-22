import { type AppState } from '~/app.model';
import { db } from '~/services';
import { mapUtil } from '~/utils/map.util';

declare global {
	var __appState__: AppState;
}

if (!global.__appState__) {
	global.__appState__ = {
		status: 'empty',
		kingdoms: new Map(),
		users: new Map(),
	};
}

export const appState = async (): Promise<AppState> => {
	const app = global.__appState__;
	if (app.status === 'empty') {
		app.status = 'loading';
		app.users = await db.user.loadAll(app.users);
		app.status = 'ready';
	} else if (app.status === 'loading') {
		return new Promise(resolve => {
			const int = setInterval(() => {
				if (app.status === 'ready') {
					clearInterval(int);
					console.log('finally loaded', mapUtil.toAppStateObject(app));
					resolve(app);
				} else {
					console.log('loading state...');
				}
			}, 100);
		});
	}
	return app;
};
