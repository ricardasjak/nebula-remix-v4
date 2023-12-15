import { type LoaderFunctionArgs } from '@remix-run/node';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { KingdomStatusComponent, PageTitle } from '~/components';
import { kdidLoaderFn, kingdomLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);
	const kdNext = await kingdomNextLoaderFn(kdid);
	return typedjson({ kd, kdNext });
};

const KingdomStatusPage: React.FC = () => {
	const { kd } = useTypedLoaderData<typeof loader>();
	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />

			<div className={'grid grid-cols-2'}>
				<div>
					<h2 className='mb-2 font-bold'></h2>
					<KingdomStatusComponent kingdom={kd.kingdom} status={kd.status} military={kd.military} />
				</div>
			</div>
		</>
	);
};

export default KingdomStatusPage;
