import { Link } from '@remix-run/react';
import { routesUtil } from '~/routes.util';

interface Props {
	kdid: number;
}

export const KingdomNavbar: React.FC<Props> = ({ kdid }) => {
	return (
		<div className={''}>
			<ul className={'list flex xs:flex-column sm:flex-row gap-4'}>
				<li>
					<Link to={routesUtil.kd.budget(kdid)}>Budget</Link>
				</li>
				<li>
					<Link to={routesUtil.kd.military(kdid)}>Military</Link>
				</li>
			</ul>
		</div>
	);
};
