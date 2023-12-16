import { useFetcher } from '@remix-run/react';
import { routesUtil } from '~/routes.util';

interface Props {
	kdid: number;
	tick: number;
	tickLimit: number;
}

export const TickButton: React.FC<Props> = ({ kdid, tick, tickLimit }) => {
	const fetcher = useFetcher({ key: 'next-tick' });
	return (
		<fetcher.Form method='post' action={routesUtil.kd.tick(kdid)}>
			{tick < tickLimit ? (
				<button
					type={'submit'}
					className={'btn btn-primary btn-sm float-right'}
					disabled={fetcher.state !== 'idle'}
				>
					Tick {tick}
				</button>
			) : (
				<div className={'btn btn-sm float-right'}>Tick {tick}</div>
			)}
		</fetcher.Form>
	);
};
