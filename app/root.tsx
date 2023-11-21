import { ClerkApp, ClerkErrorBoundary, useAuth } from '@clerk/remix';
import { rootAuthLoader } from '@clerk/remix/ssr.server';

import { type LinksFunction, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react';
import { type UserSession } from '~/app.model';
import { Navbar } from '~/components/navbar.component';
import { authLoader } from '~/loaders';
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
	return rootAuthLoader(args, () => {
		// const { userId, sessionClaims } = request.auth;
		return authLoader(args);

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

export const ErrorBoundary = ClerkErrorBoundary();

const App = () => {
	const { userId } = useLoaderData<UserSession>();
	console.log({ userId });
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
				<Navbar isLoggedIn={!!userId} />
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
