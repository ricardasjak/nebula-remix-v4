import { type LoaderFunctionArgs } from '@remix-run/node';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { PageTitle } from '~/components';
import { kdidLoaderFn, kingdomLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);
	const kdNext = await kingdomNextLoaderFn(kdid);
	return typedjson({ kd, kdNext });
};

const KingdomStatusPage: React.FC = () => {
	const { kd, kdNext } = useTypedLoaderData<typeof loader>();
	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />
			<div className={'grid grid-cols-2'}>
				<div>
					<h2>Status page</h2>
					<pre>{JSON.stringify(kd.status, null, 1)}</pre>
					<pre>{JSON.stringify(kd.buildings, null, 1)}</pre>
					<pre>{JSON.stringify(kd.military, null, 1)}</pre>
				</div>
				<div>
					<h2>Next tick projection</h2>
					<pre>{JSON.stringify(kdNext.status, null, 1)}</pre>
					<pre>{JSON.stringify(kdNext.buildings, null, 1)}</pre>
					<pre>{JSON.stringify(kdNext.military, null, 1)}</pre>
				</div>
			</div>
		</>
	);
};

export default KingdomStatusPage;
