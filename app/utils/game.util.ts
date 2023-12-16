import { type AppState } from '~/app.model';
import { mapUtil } from '~/utils/map.util';

export const gameUtil = (app: AppState) => ({
	getTicksLimit: () => {
		const rounds = mapUtil.toValues(app.rounds);
		const round = rounds[rounds.length - 1];
		if (!round) return 0;
		const now = new Date().getTime();

		return Math.floor((now - round.startAt) / (round.tickLength * 60_000));
	},
});
