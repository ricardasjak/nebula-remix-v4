import { type ActionFunction, json, type LoaderFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { useState } from 'react';
import { type Budget, type BudgetAllocation } from '~/app.model';
import { Allocation, PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';
import { authRequiredLoader, validatePlayerKingdom } from '~/loaders';
import { routesUtil } from '~/routes.util';
import { db } from '~/services';
import { allocationUtil } from '~/utils/allocation.util';

const initial: BudgetAllocation = {
	construction: 35,
	exploration: 15,
	military: 30,
	research: 60,
};

const LABELS: Record<keyof BudgetAllocation, string> = {
	construction: 'Construction',
	exploration: 'Exploration',
	military: 'Military',
	research: 'Research',
};

export const loader: LoaderFunction = async args => {
	const kdid = kdidLoaderFn(args);

	console.log(kdid);

	// const app = await appState();
	// const budget = app.budgets;
	return json(kdid);
};

export const action: ActionFunction = async args => {
	const form = await args.request.formData();
	const session = await authRequiredLoader(args);
	const kdid = Number(form.get('kdid'));
	await validatePlayerKingdom(session.userId, kdid);
	const budgetAllocation: BudgetAllocation = {
		construction: Number(form.get('construction')),
		exploration: Number(form.get('exploration')),
		military: Number(form.get('military')),
		research: Number(form.get('research')),
	};
	if (allocationUtil.balance(budgetAllocation) < 0) {
		throw new Error(`Incorrect budget allocation ${allocationUtil.balance(budgetAllocation)}%`);
	}
	const budget: Budget = { id: kdid, ...budgetAllocation };
	await db.budget.saveOne(budget);
	return redirect(routesUtil.kd.budget(kdid));
};

const KingdomBudgetPage: React.FC = () => {
	const kd = useKingdom();
	const [allocation, setAllocation] = useState(initial);
	return (
		<>
			<PageTitle title='Adjust kingdom budget' />
			<h2>{kd.id}</h2>
			<Form method='POST'>
				<input type={'hidden'} name={'kdid'} value={kd.id}></input>
				<Allocation values={allocation} labels={LABELS} onChange={setAllocation} total={50_000} />
				<button className={'btn btn-primary mt-8'}>Confirm budget</button>
			</Form>
		</>
	);
};

export default KingdomBudgetPage;
