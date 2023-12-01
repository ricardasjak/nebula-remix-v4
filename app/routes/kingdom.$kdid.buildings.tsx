import { type ActionFunction, json, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { type BuildingsAllocation, type BuildingsPlan } from '~/app.model';
import { appState } from '~/app.service';
import { Allocation, AllocationAbsolute, PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';
import { kdidLoaderFn } from '~/kingdom/kingdom.loader';
import { authRequiredLoader, validatePlayerKingdom } from '~/loaders';
import { routesUtil } from '~/routes.util';
import { db } from '~/services';
import { allocationUtil } from '~/utils/allocation.util';

const LABELS: Record<keyof BuildingsAllocation, string> = {
	residences: 'Residences',
	barracks: 'Barracks',
	powerPlants: 'Power Plants',
	starMines: 'Star Mines',
	trainingCamps: 'Training Camps',
	probeFactories: 'Probe Factories',
};

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = kdidLoaderFn(args);
	const app = await appState();
	const { id, ...plan } = app.buildingsPlan.get(kdid) || {};
	const { id: buildId, ...buildings } = app.buildings.get(kdid) || {};
	const land = app.kingdomsStatus.get(kdid)?.land || 0;

	return json({
		plan,
		buildings,
		land,
	});
};

const KingdomBuildingPage: React.FC = () => {
	const kd = useKingdom();
	const { plan, buildings, land } = useLoaderData<typeof loader>();
	const isSubmitting = !!useNavigation().formAction;

	if (!kd) {
		return null;
	}

	return (
		<>
			<PageTitle title='Adjust kingdom buildings' />

			<div className={'flex flex-col md:flex-row gap-4'}>
				<div className={'flex-grow'}>
					<h3 className={'text-md my-2'}>Construction plan</h3>
					<Form method='POST'>
						<input type={'hidden'} name={'kdid'} value={kd.id}></input>
						{/*@ts-ignore*/}
						<Allocation initial={plan} labels={LABELS} />
						<button className={'btn btn-primary mt-8'} disabled={isSubmitting}>
							Confirm buildings plan
						</button>
					</Form>
				</div>
				<div className={'flex-grow'}>
					<h3 className={'text-md my-2'}>Buildings</h3>
					{/*@ts-ignore*/}
					<AllocationAbsolute initial={buildings} labels={LABELS} maxValue={land} readOnly />
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
	const allocation: BuildingsAllocation = {
		residences: Number(form.get('residences')),
		barracks: Number(form.get('barracks')),
		powerPlants: Number(form.get('powerPlants')),
		starMines: Number(form.get('starMines')),
		trainingCamps: Number(form.get('trainingCamps')),
		probeFactories: Number(form.get('probeFactories')),
	};
	if (allocationUtil.balance(allocation) < 0) {
		throw new Error(`Incorrect buildings allocation ${allocationUtil.balance(allocation)}%`);
	}
	const plan: BuildingsPlan = { id: kdid, ...allocation };

	const app = await appState();
	app.buildingsPlan.set(kdid, plan);
	await db.buildingsPlan.saveOne(plan);
	return redirect(routesUtil.kd.buildings(kdid));
};

export default KingdomBuildingPage;
