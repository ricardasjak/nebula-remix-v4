import { type ActionFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { useTransition } from 'react';
import { kingdomTickActionFn } from '~/actions';
import { PageTitle } from '~/components';
import { useKingdom, useKingdomStatus } from '~/hooks/use-kingdom.hook';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';
import { routesUtil } from '~/routes.util';

export const action: ActionFunction = async args => {
	await kingdomTickActionFn(args);
	const id = kdidLoaderFn(args);
	return redirect(routesUtil.kd.tick(id));
};

const KingdomTickPage: React.FC = () => {
	const kdStatus = useKingdomStatus();
	const [isLoading] = useTransition();
	// // transition
	// const kd = useKingdom();
	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />
			<h2>Temporary tick page</h2>
			<pre>{JSON.stringify(kdStatus, null, 2)}</pre>
			<Form method='POST'>
				<button className={'btn btn-primary'} type={'submit'} disabled={isLoading}>
					Next tick
				</button>
			</Form>
		</>
	);
};

export default KingdomTickPage;
