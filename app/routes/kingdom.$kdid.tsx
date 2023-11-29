import { Outlet } from '@remix-run/react';
import { KingdomNavbar } from '~/components/kd.navbar.component';
import { useKingdomId } from '~/hooks';
import { kingdomLoader } from '~/kingdom/kingdom.loader';

export const loader = kingdomLoader;

const KingdomPage: React.FC = () => {
	const kdid = useKingdomId();
	return (
		<div>
			<KingdomNavbar kdid={kdid} />
			<div className={'mt-2'}>
				<Outlet />
			</div>
		</div>
	);
};

export default KingdomPage;
