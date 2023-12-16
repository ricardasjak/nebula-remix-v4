import { type LoaderFunctionArgs } from '@remix-run/node';
import { useNavigate, useNavigation } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import {
	BudgetComponent,
	BuildingPlanComponent,
	KingdomSoKComponent,
	KingdomStatusComponent,
	MilitaryPlanComponent,
	PageTitle,
} from '~/components';
import { kdUtil } from '~/kingdom';
import { kdidLoaderFn, kingdomLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);
	const kdNext = await kingdomNextLoaderFn(kdid);
	return typedjson({ kd, kdNext });
};

const KingdomStatusPage: React.FC = () => {
	const { kd, kdNext } = useTypedLoaderData<typeof loader>();

	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />

			<div
				className={'grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4'}
			>
				<div>
					<h2 className='text-xl text-primary font-bold mb-2'>
						{kdUtil.getKingdomNameXY(kd.kingdom)}
					</h2>
					<KingdomStatusComponent kd={kd} kdNext={kdNext} />
					<br />
					<KingdomSoKComponent kd={kd} kdNext={kdNext} />
				</div>

				<>
					<BudgetComponent
						budget={kd.budget}
						kdid={kd.kingdom.id}
						money={kd.status.money}
						income={kd.status.income}
					/>
					<BuildingPlanComponent plan={kd.buildingsPlan} kdid={kd.kingdom.id} />
					<MilitaryPlanComponent plan={kd.militaryPlan} kdid={kd.kingdom.id} />
				</>
			</div>
		</>
	);
};

export default KingdomStatusPage;
