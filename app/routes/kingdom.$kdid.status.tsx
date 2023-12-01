import { type ActionFunction, redirect } from '@remix-run/node';
import { Form, useNavigation } from '@remix-run/react';
import { useTransition } from 'react';
import { kingdomTickActionFn } from '~/actions';
import { PageTitle } from '~/components';
import { useSubmitting } from '~/hooks';
import { useKingdom, useKingdomStatus } from '~/hooks/use-kingdom.hook';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';
import { routesUtil } from '~/routes.util';

export const action: ActionFunction = async args => {
	await kingdomTickActionFn(args);
	const id = kdidLoaderFn(args);
	return redirect(routesUtil.kd.status(id));
};

const KingdomStatusPage: React.FC = () => {
	const kdStatus = useKingdomStatus();
	const pending = useSubmitting();
	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />
			<h2>Status page</h2>
			<pre>{JSON.stringify(kdStatus, null, 2)}</pre>
			<Form method='POST'>
				<button className={'btn btn-primary'} type={'submit'} disabled={pending}>
					Next tick
				</button>
			</Form>
		</>
	);
};

export default KingdomStatusPage;
