import { type LoaderFunctionArgs } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { appState } from '~/app.service';
import { kdUtil } from '~/kingdom/kd.util';
import { routesUtil } from '~/routes.util';

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = Number(args.params.kdid);
	const app = await appState();
	const worldKingdom = kdUtil.getWorldKingdom(kdid, app);
	return typedjson({ kingdom: worldKingdom });
};

const WorldKingdomPage: React.FC = () => {
	const { kingdom } = useTypedLoaderData<typeof loader>();
	const handleClick = () => alert('Not yet');
	return (
		<div>
			<h1>Kingdom page</h1>
			<Link to={routesUtil.home} className='btn btn-primary btn-sm my-4'>
				Back to World map
			</Link>
			<pre>{JSON.stringify(kingdom, null, 4)}</pre>
			<div className='flex gap-4'>
				<button className='btn btn-primary btn-sm btn-outline' onClick={handleClick}>
					Attack
				</button>
				<button className='btn btn-primary btn-sm btn-outline' onClick={handleClick}>
					Probe
				</button>
				<button className='btn btn-primary btn-sm btn-outline' onClick={handleClick}>
					Message
				</button>
			</div>
		</div>
	);
};

export default WorldKingdomPage;
