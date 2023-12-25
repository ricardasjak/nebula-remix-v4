import { Link, Outlet, useParams } from '@remix-run/react';
import { usePlayerKingdoms } from '~/hooks';
import { routesUtil } from '~/routes.util';

const AttackWithPage: React.FC = () => {
	const params = useParams();
	const target = Number(params?.target);
	const kingdoms = usePlayerKingdoms();
	const selected = Number(params?.kdid);

	return (
		<div>
			<h3 className='text-primary text-lg block'>Choose your probes kingdom:</h3>
			<div className='flex flex-row gap-4'>
				<ul className='p-2 flex flex-wrap justify-evenly'>
					{kingdoms.map(kd => (
						<li key={kd.id} className={selected === kd.id ? 'text-primary' : undefined}>
							<Link
								to={routesUtil.world.probeWith(target, kd.id)}
								prefetch='none'
								className={'btn btn-ghost font-normal'}
								style={{ minWidth: '120px' }}
							>{`${kd.name}`}</Link>
						</li>
					))}
				</ul>
			</div>
			<hr />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default AttackWithPage;
