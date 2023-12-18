import { Outlet } from '@remix-run/react';
import { kingdomLoader } from '~/kingdom/kingdom.loader';

export const loader = kingdomLoader;

const KingdomPage: React.FC = () => {
	return (
		<div className={'mt-2'}>
			<Outlet />
		</div>
	);
};

export default KingdomPage;
