import { type ActionFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { type PersonalProbeNews } from '~/app.model';
import { appState } from '~/app.service';
import { NewsComponent, PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';
import { kdUtil } from '~/kingdom';
import { kdidLoaderFn, kingdomLoaderFn } from '~/kingdom/kingdom.loader';

export const loader = async (args: LoaderFunctionArgs) => {
	const kdid = await kdidLoaderFn(args);
	const { news, kingdom, status } = await kingdomLoaderFn(kdid);
	const app = await appState();
	const unseenNews = news.filter(n => n.id > status.lastNewsId);
	const showAll = !!new URL(args.request.url).searchParams.get('all') || unseenNews.length === 0;
	status.lastNewsId = news[0]?.id || status.lastNewsId;

	// @ts-ignore
	const personalNews: PersonalProbeNews[] = (showAll ? news : unseenNews)
		.map(n => {
			if ('probeId' in n) {
				const probing = app.probings.get(n.attackerId)?.get(n.probeId);
				if (!probing) {
					console.error('Probing not found: ', n.attackerId, n.probeId);
					return undefined;
				}
				return {
					success: probing.success,
					attackerId: probing.success ? undefined : n.attackerId,
					at: probing.createdAt,
					type: 'probe',
					attackerName: probing.success
						? 'success'
						: kdUtil.getKingdomNameXY(app.kingdoms.get(probing.attackerId)!),
					report: probing.success ? 'Somebody probed your kingdom' : 'failed probe mission',
					id: n.id,
				};
			}
			return undefined;
		})
		.filter(n => !!n);

	return typedjson({ personalNews, kingdom, showAll });
};

export const action: ActionFunction = async args => {
	return typedjson({ success: true });
};

const KingdomNewsPage: React.FC = () => {
	const kd = useKingdom();
	const { personalNews, kingdom, showAll } = useTypedLoaderData<typeof loader>();

	if (!kd) {
		return null;
	}

	return (
		<>
			{personalNews.length ? (
				<>
					<div className='flex flex-row items-baseline gap-2'>
						<PageTitle title={showAll ? 'All personal news of' : 'Recent news of'} />
						<span className='text-primary text-lg'>{kdUtil.getKingdomNameXY(kingdom)}</span>
					</div>
					<NewsComponent news={personalNews} />
					<p className='text-secondary'>News count: {personalNews.length}</p>
				</>
			) : (
				<PageTitle title='No recent news' />
			)}
		</>
	);
};

export default KingdomNewsPage;
