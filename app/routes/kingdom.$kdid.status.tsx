import { type ActionFunction, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { kingdomTickActionFn } from '~/actions';
import { PageTitle } from '~/components';
import { useSubmitting } from '~/hooks';
import { useKingdomStatus } from '~/hooks/use-kingdom.hook';
import { kdidLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';
import { routesUtil } from '~/routes.util';

export const action: ActionFunction = async args => {
	await kingdomTickActionFn(args);
	const id = await kdidLoaderFn(args);
	return redirect(routesUtil.kd.status(id));
};

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const kdNext = await kingdomNextLoaderFn(kdid);
	return typedjson(kdNext);
};

const KingdomStatusPage: React.FC = () => {
	const kdStatus = useKingdomStatus();
	const kdNext = useTypedLoaderData<typeof loader>();
	const pending = useSubmitting();
	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />
			<h2>Status page</h2>
			<pre>{JSON.stringify(kdStatus, null, 2)}</pre>
			<Form method='POST'>
				<button className={'btn btn-primary'} type={'submit'} disabled={pending}>
					Go one tick
				</button>
			</Form>
			<h3>Next tick projection:</h3>
			<pre>{JSON.stringify(kdNext.status, null, 2)}</pre>
		</>
	);
};

export default KingdomStatusPage;
