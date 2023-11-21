import { Outlet } from '@remix-run/react';
import { authRequiredLoader } from '~/loaders';

export const loader = authRequiredLoader;

const KingdomPageLayout: React.FC = () => {
	return (
		<div className={'container mx-auto px-4'}>
			<Outlet />
		</div>
	);
};

export default KingdomPageLayout;
