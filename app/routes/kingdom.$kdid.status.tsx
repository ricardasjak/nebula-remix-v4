import { type ActionFunction, json, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { useTransition } from 'react';
import { kingdomTickActionFn } from '~/actions';
import { tickNextKingdom } from '~/actions-tick/tick';
import { appState } from '~/app.service';
import { PageTitle } from '~/components';
import { useSubmitting } from '~/hooks';
import { useKingdom, useKingdomStatus } from '~/hooks/use-kingdom.hook';
import { kdUtil } from '~/kingdom/kd.util';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';
import { routesUtil } from '~/routes.util';

export const action: ActionFunction = async args => {
	await kingdomTickActionFn(args);
	const id = kdidLoaderFn(args);
	return redirect(routesUtil.kd.status(id));
};

export const loader = async (args: LoaderFunctionArgs) => {
	const id = kdidLoaderFn(args);
	const app = await appState();
	const kd = kdUtil.getFullKingdom(id, app);
	const kdNext = tickNextKingdom(kd);
	return kdNext;
};

const KingdomStatusPage: React.FC = () => {
	const kdStatus = useKingdomStatus();
	const kdNext = useLoaderData<typeof loader>();
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
