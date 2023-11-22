import { type ActionFunction, type LoaderFunction, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { appState } from '~/app.service';
import { authRequiredLoader } from '~/loaders';
import { routesUtil } from '~/routes.util';
import { db } from '~/services';
import { mapUtil } from '~/utils/map.util';

export const loader: LoaderFunction = async args => {
	await authRequiredLoader(args);
	return mapUtil.toAppStateObject(await appState());
};

export const action: ActionFunction = async () => {
	const app = await appState();
	await db.user.saveAll(app.users);
	return redirect(routesUtil.admin.panel);
};

const AdminPage: React.FC = () => {
	const state = useLoaderData<typeof loader>();
	return (
		<div>
			<Form method='POST'>
				<button type={'submit'} className={'btn btn-primary'}>
					Save Users
				</button>
			</Form>
			<pre>{JSON.stringify(state, null, 2)}</pre>
		</div>
	);
};

export default AdminPage;
