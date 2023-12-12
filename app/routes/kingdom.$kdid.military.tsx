import { type ActionFunction, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useNavigation } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { type MilitaryPlan } from '~/app.model';
import { appState } from '~/app.service';
import { Allocation, AllocationAbsolute, PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';
import { kdidLoaderFn, kingdomLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';
import { authRequiredLoader, validatePlayerKingdom } from '~/loaders';
import { routesUtil } from '~/routes.util';
import { db } from '~/services';
import { allocationUtil } from '~/utils/allocation.util';

const LABELS: Partial<Record<keyof MilitaryPlan, string>> = {
	sold: 'Soldiers',
	// dr: 'Dragoons',
	// ld: 'Laser Dragoons',
	tr: 'Troopers',
	lt: 'Laser Troopers',
	t: 'Tanks',
	sci: 'Scientists',
};

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);
	const kdNext = await kingdomNextLoaderFn(kdid);

	return typedjson({
		plan: kd.militaryPlan,
		military: kd.military as MilitaryPlan,
		militaryNext: kdNext.military as MilitaryPlan,
	});
};

const KingdomMilitaryPage: React.FC = () => {
	const kd = useKingdom();
	const { plan, military, militaryNext } = useTypedLoaderData<typeof loader>();
	const isSubmitting = !!useNavigation().formAction;

	console.log({ plan });

	if (!kd) {
		return null;
	}

	return (
		<>
			<PageTitle title='Military overview' />

			<div className={'flex flex-col md:flex-row gap-4'}>
				<div className={'flex-grow flex-1'}>
					<h3 className={'text-md my-2'}>Military budget allocation</h3>
					<Form method='POST'>
						<input type={'hidden'} name={'kdid'} value={kd.id}></input>
						<Allocation initial={plan} labels={LABELS} />
						<button className={'btn btn-primary mt-8'} disabled={isSubmitting}>
							Confirm military plan
						</button>
					</Form>
				</div>
				<div className={'flex-grow flex-1'}>
					<h3 className={'text-md my-2'}>Military units you have</h3>
					<AllocationAbsolute
						values={military}
						nextValues={militaryNext}
						labels={LABELS}
						// maxValue={land}
						readOnly
					/>
				</div>
			</div>
		</>
	);
};

export const action: ActionFunction = async args => {
	const form = await args.request.formData();
	const session = await authRequiredLoader(args);
	const kdid = Number(form.get('kdid'));
	await validatePlayerKingdom(session.userId, kdid);
	const plan: MilitaryPlan = {
		sold: Number(form.get('sold')),
		tr: Number(form.get('tr')),
		dr: Number(form.get('dr')),
		lt: Number(form.get('lt')),
		ld: Number(form.get('ld')),
		t: Number(form.get('t')),
		sci: Number(form.get('sci')),
	};
	console.log({ plan });
	if (allocationUtil.balance(plan) < 0) {
		throw new Error(`Incorrect military allocation ${allocationUtil.balance(plan)}%`);
	}

	const app = await appState();
	app.militaryPlan.set(kdid, plan);
	await db.militaryPlan.saveOne(kdid, plan);
	return redirect(routesUtil.kd.military(kdid));
};

export default KingdomMilitaryPage;
