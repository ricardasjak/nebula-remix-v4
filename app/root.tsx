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
import { useEffect } from 'react';
import { Navbar } from '~/components/navbar.component';
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
export const loader: LoaderFunction = args => {
	return rootAuthLoader(args, ({ request }) => {
		const { userId } = request.auth;
		return { userId };
	});
};

export const ErrorBoundary = ClerkErrorBoundary();

const App = () => {
	const data = useLoaderData<typeof loader>();
	const { isSignedIn } = useAuth();

	useEffect(() => {
		if (isSignedIn && !data?.userId) {
			// work around Clerk issue, basic login by email and password goes "unnoticed"
			window.location.reload();
		}
	}, [data?.userId, isSignedIn]);

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
				<Navbar isLoggedIn={!!data?.userId} />
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
