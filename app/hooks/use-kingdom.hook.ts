import { useRouteLoaderData } from '@remix-run/react';
import { type Kingdom } from '~/kingdom';

/**
 * Returns active kingdom on the client side (if one selected)
 */
export const useKingdom = () => {
	return useRouteLoaderData<Kingdom | undefined>('routes/kd.$kdid');
};
