import { type rootAuthLoader } from '@clerk/remix/ssr.server';
import { Link, useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { WorldMap } from '~/components';
import { GAME } from '~/game.const';
import { type Kingdom } from '~/kingdom';
import { type WorldKingdom, worldLoader } from '~/loaders/world.loader';
import { routesUtil } from '~/routes.util';

export const loader = worldLoader;

export const WorldMapPage: React.FC = () => {
	const rootData = useRouteLoaderData<typeof rootAuthLoader>('root');
	const world = useLoaderData() as WorldKingdom[];
	const kingdoms = useMemo(
		() => (rootData?.kingdoms as Kingdom[]).sort((a, b) => b.land - a.land),
		[rootData?.kingdoms]
	);
	const canCreate = kingdoms.length < GAME.kingdomsLimit;
	const ownedKingdoms = useMemo(() => kingdoms.map(k => k.id), [kingdoms]);
	return (
		<div>
			<WorldMap kingdoms={world} ownerKingdoms={ownedKingdoms} />
			{canCreate && (
				<Link to={routesUtil.kd.create} className={'btn btn-primary mx-auto text-center'}>
					Create Kingdom
				</Link>
			)}
		</div>
	);
};

export default WorldMapPage;
