import { useFetcher } from '@remix-run/react';
import { routesUtil } from '~/routes.util';

interface Props {
	kdid: number;
}

export const TickButton: React.FC<Props> = ({ kdid }) => {
	const fetcher = useFetcher({ key: 'next-tick' });
	return (
		<fetcher.Form method='post' action={routesUtil.kd.tick(kdid)}>
			<button type={'submit'} className={'btn btn-primary btn-sm float-right'}>
				Next Tick
			</button>
		</fetcher.Form>
	);
};
