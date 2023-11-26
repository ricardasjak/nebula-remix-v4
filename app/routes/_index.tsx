import { type rootAuthLoader } from '@clerk/remix/ssr.server';
import { type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { WorldMap } from '~/components';
import { type Kingdom } from '~/kingdom';
import { type WorldKingdom, worldLoader } from '~/loaders/world.loader';
import { routesUtil } from '~/routes.util';

export const meta: MetaFunction = () => {
	return [{ title: 'Nebula map' }, { name: 'description', content: 'Welcome to Nebula Kingdoms!' }];
};

export const loader = worldLoader;

export default function Index() {
	const rootData = useRouteLoaderData<typeof rootAuthLoader>('root');
	const world = useLoaderData() as WorldKingdom[];
	const kingdoms = useMemo(
		() => (rootData?.kingdoms as Kingdom[]).sort((a, b) => b.land - a.land),
		[rootData?.kingdoms]
	);
	const ownedKingdoms = useMemo(() => kingdoms.map(k => k.id), [kingdoms]);
	const hasKingdom = kingdoms.length > 0;
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
			<h1 className={'text-xl mb-2 inline-block'}>
				Welcome to <span className={'text-primary'}>Nebula.</span> &nbsp;
			</h1>

			{hasKingdom ? (
				<>
					<h2 className={'text-primary text-sm mb-8'}>Check your kingdoms:</h2>
					<ul className={'list'}>
						{kingdoms.map(kd => (
							<li key={kd.id} className={'list-item mb-2'}>
								<Link
									to={routesUtil.kd.home(kd.id)}
									className={'link link-hover grid grid-flow-col sm:grid-cols-5 xs:grid-cols-3'}
								>
									<span>{`${kd.name} (${kd.x}:${kd.y})`}</span>
									<span className={'hidden sm:block'}>{kd.planet}</span>
									<span className={'hidden sm:block'}>{kd.race}</span>
									<span>{kd.land.toLocaleString()}</span>
									<span>{kd.nw.toLocaleString()}</span>
								</Link>
							</li>
						))}
					</ul>
				</>
			) : (
				<>
					<span className={'text-sm mb-8'}>It's time to start your journey!</span>
					&nbsp;
				</>
			)}
			{/*<hr className={'border-primary my-4'} />*/}
			<div className={''}>
				{/*<h3 className={'text-primary text-lg text-center'}>Nebula map</h3>*/}
				<WorldMap kingdoms={world} ownerKingdoms={ownedKingdoms} />
				<Link to={routesUtil.kd.create} className={'btn btn-primary'}>
					Create Kingdom
				</Link>
			</div>
		</div>
	);
}
