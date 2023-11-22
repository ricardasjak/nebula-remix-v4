import { Link, Outlet, useRouteError } from '@remix-run/react';
import { routesUtil } from '~/routes.util';

export function ErrorBoundary() {
	const error = useRouteError();
	let msg = 'Unknown error';
	try {
		// @ts-ignore
		msg = error.toString();
	} catch {}
	console.error(msg);
	return (
		<div>
			<h1 className={'text-xl'}>Some error happened</h1>
			<div className={'my-4'}>
				<code className={'text-error'}>{msg}</code>
			</div>
			<Link to={routesUtil.home} className={'link link-primary'}>
				Go back
			</Link>
		</div>
	);
}

const KingdomPageLayout: React.FC = () => {
	return (
		<div className={'container mx-auto px-4'}>
			<Outlet />
		</div>
	);
};

export default KingdomPageLayout;
