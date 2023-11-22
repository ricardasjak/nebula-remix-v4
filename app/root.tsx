import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix';
import { rootAuthLoader } from '@clerk/remix/ssr.server';

import { type LinksFunction, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRouteError,
} from '@remix-run/react';
import { type UserSession } from '~/app.model';
import { Navbar, type NavbarKingdom } from '~/components/navbar.component';
import { authLoader } from '~/loaders';
import { playerKingdomsLoader } from '~/loaders/player-kingdoms.loader';
import { routesUtil } from '~/routes.util';
import stylesheet from '~/tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

export const meta: MetaFunction = () => [
	{
		charset: 'utf-8',
		title: 'New Remix App',
		viewport: 'width=device-width,initial-scale=1',
	},
];

// export const loader: LoaderFunction = (args) => rootAuthLoader(args);
export const loader: LoaderFunction = async args => {
	// const getSession = await authLoader(args);
	// @ts-ignore
	return rootAuthLoader(args, async () => {
		// const { userId, sessionClaims } = request.auth;
		const auth = await authLoader(args);
		const kingdoms = await playerKingdomsLoader(args);
		return {
			...auth,
			kingdoms,
		};

		// if (userId && sessionClaims?.email) {
		// 	const session: UserSession = {
		// 		userId: 1,
		// 		clerkUserId: userId,
		// 		email: sessionClaims.email as string,
		// 	};
		// 	return Promise.resolve(session);
		// }
		// return {};
	});
};

function RootErrorBoundary() {
	const error = useRouteError();
	let msg = 'Unknown error';
	try {
		// @ts-ignore
		msg = error.toString();
	} catch {}
	console.error(msg);
	return (
		<html>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body>
				{/* add the UI you want your users to see */}
				<h1>Some error happened</h1>
				<pre>{msg}</pre>
				<Link to={routesUtil.home}>Go back</Link>
				<Scripts />
			</body>
		</html>
	);
}
export const ErrorBoundary = ClerkErrorBoundary(RootErrorBoundary);

const App = () => {
	const rootData = useLoaderData<UserSession>();
	// @ts-ignore
	const kingdoms: NavbarKingdom[] = rootData.kingdoms;
	// console.log({ rootData });
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Nebula Kingdoms</title>
				<Meta />
				<Links />
			</head>
			<body>
				<Navbar isLoggedIn={!!rootData.userId} kingdoms={kingdoms} />
				<div className={'container mx-auto px-4'}>
					<Outlet />
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
};

export default ClerkApp(App);
