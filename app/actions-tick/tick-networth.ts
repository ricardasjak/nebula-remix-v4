import { type AppState } from '~/app.model';
import { kdUtil } from '~/kingdom/kd.util';

export const tickNetworth = (kdid: number, app: AppState) => {
	const { status, military, buildings } = kdUtil.getFullKingdom(kdid, app);
	return Math.floor(kdUtil.getNetworth(status, buildings, military));
};
