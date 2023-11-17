import type { AppState } from '~/app.model';

declare global {
	var __appState__: AppState;
}

if (!global.__appState__) {
	global.__appState__ = {
		kingdoms: new Map(),
	};
}

export const appState = async () => {
	return global.__appState__;
};
