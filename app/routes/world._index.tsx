import { type rootAuthLoader } from '@clerk/remix/ssr.server';
import { Link, useRouteLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { useTypedLoaderData } from 'remix-typedjson';
import { WorldList } from '~/components';
import { GAME } from '~/game.const';
import { type PlayerKingdom } from '~/loaders';
import { worldLoader } from '~/loaders/world.loader';
import { routesUtil } from '~/routes.util';

export const loader = worldLoader;

export const WorldMapPage: React.FC = () => {
	const rootData = useRouteLoaderData<typeof rootAuthLoader>('root');
	const world = useTypedLoaderData<typeof worldLoader>();
	const kingdoms = useMemo(
		() => (rootData?.kingdoms as PlayerKingdom[]).sort((a, b) => b.land - a.land),
		[rootData?.kingdoms]
	);
	const canCreate = kingdoms.length < GAME.kingdomsLimit;
	const ownedKingdoms = useMemo(() => kingdoms.map(k => k.id), [kingdoms]);
	return (
		<div>
			{/*<WorldMap kingdoms={world} ownerKingdoms={ownedKingdoms} />*/}
			<WorldList kingdoms={world} ownerKingdoms={ownedKingdoms} />
			{canCreate && (
				<Link to={routesUtil.kd.create} className={'btn btn-primary mx-auto text-center'}>
					Create Kingdom
				</Link>
			)}
		</div>
	);
};

export default WorldMapPage;
