import { useRouteLoaderData } from '@remix-run/react';
import { type kingdomLoader } from '~/kingdom/kingdom.loader';

/**
 * Returns active kingdom on the client side (if one selected)
 */
export const useKingdom = () => {
	return useRouteLoaderData<typeof kingdomLoader>('routes/kd');
};
