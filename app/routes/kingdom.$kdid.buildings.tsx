import { type ActionFunction, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useNavigation } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { type BuildingsAllocation, type BuildingsPlan } from '~/app.model';
import { appState } from '~/app.service';
import { Allocation, AllocationAbsolute, PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';
import { kdUtil } from '~/kingdom/kd.util';
import { kdidLoaderFn, kingdomLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';
import { authRequiredLoader, validatePlayerKingdom } from '~/loaders';
import { routesUtil } from '~/routes.util';
import { db } from '~/services';
import { formatDiff, formatNumber } from '~/utils';
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
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);
	const kdNext = await kingdomNextLoaderFn(kdid);

	return typedjson({
		plan: kd.buildingsPlan,
		buildings: kd.buildings,
		buildingsNext: kdNext.buildings,
		land: kd.status.land,
		landNext: kdNext.status.land,
	});
};

const KingdomBuildingPage: React.FC = () => {
	const kd = useKingdom();
	const { plan, buildings, land, landNext, buildingsNext } = useTypedLoaderData<typeof loader>();
	const freeLand = land - kdUtil.builtLand(buildings);
	const freeLandNext = landNext - kdUtil.builtLand(buildingsNext);
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
						<Allocation initial={plan} labels={LABELS} />
						<button className={'btn btn-primary mt-8'} disabled={isSubmitting}>
							Confirm buildings plan
						</button>
					</Form>
				</div>
				<div className={'flex-grow'}>
					<h3 className={'text-md my-2'}>Buildings</h3>
					<AllocationAbsolute
						values={buildings}
						nextValues={buildingsNext}
						labels={LABELS}
						maxValue={land}
						readOnly
					/>
					<h3>
						Free land: {formatNumber(freeLand)}{' '}
						{freeLandNext - freeLand ? (
							<span className={'text-primary'}>({formatDiff(freeLandNext - freeLand)})</span>
						) : null}
					</h3>
					<h3>
						Total land: {formatNumber(land)}{' '}
						{landNext - land ? (
							<span className={'text-primary'}>({formatDiff(landNext - land)})</span>
						) : null}
					</h3>
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
