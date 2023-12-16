import { Outlet } from '@remix-run/react';
import { useTypedLoaderData, useTypedRouteLoaderData } from 'remix-typedjson';
import { KingdomNavbar } from '~/components/kd.navbar.component';
import { useKingdomId } from '~/hooks';
import { kingdomLoader } from '~/kingdom/kingdom.loader';

export const loader = kingdomLoader;

const KingdomPage: React.FC = () => {
	const kdid = useKingdomId();
	const root = useTypedRouteLoaderData('root');
	const { status } = useTypedLoaderData<typeof loader>();
	return (
		<div>
			<KingdomNavbar kdid={kdid} tick={status.tick || 1} tickLimit={root.ticksLimit} />
			<div className={'mt-2'}>
				<Outlet />
			</div>
		</div>
	);
};

export default KingdomPage;
