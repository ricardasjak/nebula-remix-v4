import { type LoaderFunctionArgs } from '@remix-run/node';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { appState } from '~/app.service';
import {
	BudgetComponent,
	BuildingPlanComponent,
	KingdomSoKComponent,
	KingdomStatusComponent,
	MilitaryPlanComponent,
	PageTitle,
	TickButton,
} from '~/components';
import { kdUtil } from '~/kingdom';
import { kdidLoaderFn, kingdomLoaderFn, kingdomNextLoaderFn } from '~/kingdom/kingdom.loader';
import { gameUtil } from '~/utils';

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const kd = await kingdomLoaderFn(kdid);
	const ticksLimit = gameUtil(await appState()).getTicksLimit();
	const kdNext = await kingdomNextLoaderFn(kdid);
	return typedjson({ kd, kdNext, ticksLimit });
};

const KingdomDevelopmentPage: React.FC = () => {
	const { kd } = useTypedLoaderData<typeof loader>();

	return (
		<>
			<PageTitle title={`Develop your kingdom`} />
			<div
				className={'grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4'}
			>
				<div>
					<h2 className='text-xl text-primary font-bold'>{kdUtil.getKingdomNameXY(kd.kingdom)} </h2>
					<span className='text-sm mb-2  text-secondary'></span>
				</div>
			</div>
		</>
	);
};

export default KingdomDevelopmentPage;
