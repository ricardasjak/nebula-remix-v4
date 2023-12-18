import { Link } from '@remix-run/react';
import { useTypedRouteLoaderData } from 'remix-typedjson';
import { TickButton } from '~/components';
import { useKingdomId } from '~/hooks';
import { type kingdomLoader } from '~/kingdom/kingdom.loader';
import { routesUtil } from '~/routes.util';

interface Props {}

export const KingdomNavbar: React.FC<Props> = () => {
	const kdid = useKingdomId();
	const root = useTypedRouteLoaderData('root');
	const kingdomData = useTypedRouteLoaderData<typeof kingdomLoader>('routes/kingdom.$kdid');

	if (!kingdomData) {
		return null;
	}
	const linkStyle = 'text-primary hover:text-secondary';
	return (
		<div className={'container mx-auto px-4 py-2 visible xs:hidden'}>
			<ul className={'list flex xs:flex-column sm:flex-row gap-4 sm:gap-8 mb-2 text-xs sm:text-lg'}>
				<li>
					<Link to={routesUtil.kd.status(kdid)} className={linkStyle}>
						Status
					</Link>
				</li>
				<li>
					<Link to={routesUtil.kd.budget(kdid)} className={linkStyle}>
						Budget
					</Link>
				</li>
				<li>
					<Link to={routesUtil.kd.buildings(kdid)} className={linkStyle}>
						Buildings
					</Link>
				</li>
				<li>
					<Link to={routesUtil.kd.military(kdid)} className={linkStyle}>
						Military
					</Link>
				</li>
				<li className={'flex-grow'}>
					<TickButton kdid={kdid} tick={kingdomData.status.tick || 1} tickLimit={root.ticksLimit} />
				</li>
			</ul>
		</div>
	);
};
