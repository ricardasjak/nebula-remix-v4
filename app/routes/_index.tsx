import { type MetaFunction } from '@remix-run/node';
import { Link, useRouteLoaderData } from '@remix-run/react';
import { type Kingdom } from '~/kingdom';
import { routesUtil } from '~/routes.util';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Nebula Kingdoms!' },
	];
};

export default function Index() {
	const rootData = useRouteLoaderData('root');
	// @ts-ignore
	const kingdoms = (rootData.kingdoms as Kingdom[]).sort((a, b) => b.land - a.land);
	const hasKingdom = kingdoms.length > 0;
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
			<h1 className={'text-xl mb-2'}>
				Welcome to <span className={'text-primary'}>Nebula</span>
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
									<span>{kd.name}</span>
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
					<h2 className={'text-primary text-sm mb-8'}>it's time to start your journey!</h2>
					<Link to={'/kd/create'} className={'btn btn-primary'}>
						Create Kingdom
					</Link>
				</>
			)}
			<hr className={'border-primary mt-4'} />
		</div>
	);
}
