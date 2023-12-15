import { useFetcher } from '@remix-run/react';
import { type Budget } from '~/app.model';
import { Allocation } from '~/components/allocation.component';
import { routesUtil } from '~/routes.util';

export const BUDGET_LABELS: Record<keyof Budget, string> = {
	construction: 'Construction',
	exploration: 'Exploration',
	military: 'Military',
	// research: 'Research',
};

interface Props {
	budget: Budget;
	kdid: number;
	money: number;
	income: number;
}

export const BudgetComponent: React.FC<Props> = ({ kdid, budget, money, income }) => {
	const fetcher = useFetcher({ key: 'set-budget' });
	return (
		<fetcher.Form method='POST' action={routesUtil.kd.budget(kdid)}>
			<input type={'hidden'} name={'kdid'} value={kdid}></input>
			<Allocation initial={budget} labels={BUDGET_LABELS} total={income + money} />
			<button className={'btn btn-primary mt-8'} disabled={fetcher.state !== 'idle'}>
				Confirm budget
			</button>
		</fetcher.Form>
	);
};
