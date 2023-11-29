import { useRouteLoaderData } from '@remix-run/react';
import { type KingdomStatus } from '~/app.model';
import { type Kingdom } from '~/kingdom';
import { type kingdomLoader } from '~/kingdom/kingdom.loader';

/**
 * Returns active kingdom on the client side (if one selected)
 */
export const useKingdom = (): Kingdom | undefined => {
	return useRouteLoaderData<typeof kingdomLoader>('routes/kingdom.$kdid')?.kingdom;
};

export const useKingdomStatus = (): KingdomStatus | undefined => {
	return useRouteLoaderData<typeof kingdomLoader>('routes/kingdom.$kdid')?.kingdomStatus;
};
