import { useMemo } from 'react';
import { useTypedRouteLoaderData } from 'remix-typedjson';
import { type PlayerKingdom } from '~/loaders';

export const usePlayerKingdoms = () => {
	const rootData = useTypedRouteLoaderData('root');
	return useMemo(
		() => ([...(rootData?.kingdoms || [])] as PlayerKingdom[]).sort((a, b) => b.nw - a.nw),
		[rootData?.kingdoms]
	);
};
