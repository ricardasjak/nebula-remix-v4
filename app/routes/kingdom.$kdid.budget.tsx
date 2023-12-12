import { type ActionFunction, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useNavigation } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { type Budget } from '~/app.model';
import { appState } from '~/app.service';
import { Allocation, PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';
import { kdidLoaderFn, kingdomLoaderFn } from '~/kingdom/kingdom.loader';
import { routesUtil } from '~/routes.util';
import { db } from '~/services';
import { allocationUtil } from '~/utils/allocation.util';

const LABELS: Record<keyof Budget, string> = {
	construction: 'Construction',
	exploration: 'Exploration',
	military: 'Military',
	// research: 'Research',
};

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const { budget } = await kingdomLoaderFn(kdid);
	return typedjson({ budget });
};

const KingdomBudgetPage: React.FC = () => {
	const kd = useKingdom();
	const { budget } = useTypedLoaderData<typeof loader>();
	const isSubmitting = !!useNavigation().formAction;

	if (!kd) {
		return null;
	}

	return (
		<>
			<PageTitle title='Adjust kingdom budget' />
			<Form method='POST'>
				<input type={'hidden'} name={'kdid'} value={kd.id}></input>
				<Allocation initial={budget} labels={LABELS} total={50_000} />
				<button className={'btn btn-primary mt-8'} disabled={isSubmitting}>
					Confirm budget
				</button>
			</Form>
		</>
	);
};

export const action: ActionFunction = async args => {
	const form = await args.request.formData();
	const kdid = await kdidLoaderFn(args);
	const budget: Budget = {
		construction: Number(form.get('construction')),
		exploration: Number(form.get('exploration')),
		military: Number(form.get('military')),
		// @ts-ignore
		research: 0, //Number(form.get('research')),
	};
	if (allocationUtil.balance(budget) < 0) {
		throw new Error(`Incorrect budget allocation ${allocationUtil.balance(budget)}%`);
	}
	const app = await appState();
	app.budgets.set(kdid, budget);
	await db.budget.saveOne(kdid, budget);
	return redirect(routesUtil.kd.budget(kdid));
};

export default KingdomBudgetPage;
