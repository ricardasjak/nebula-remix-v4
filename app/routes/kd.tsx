import { Outlet } from '@remix-run/react';
import { authLoader } from '~/loaders';

export const loader = authLoader;

const KingdomPageLayout: React.FC = () => {
	return (
		<div className={'container mx-auto px-4'}>
			<Outlet />
		</div>
	);
};

export default KingdomPageLayout;
