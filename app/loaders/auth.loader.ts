import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunction, redirect } from '@remix-run/node';
import { routesUtil } from '~/routes.util';

export const authLoader: LoaderFunction = async args => {
	const auth = await getAuth(args);
	console.log('******** auth user id', auth.userId);
	// if (!userId) {
	// 	return redirect(routesUtil.signup);
	// }
	return {};
};
