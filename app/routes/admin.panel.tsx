import { type ActionFunction, type LoaderFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { db } from '~/.server/db';
import { appState } from '~/app.service';
import { authRequiredLoader } from '~/loaders';
import { routesUtil } from '~/routes.util';
import { mapUtil } from '~/utils/map.util';

export const loader: LoaderFunction = async args => {
	await authRequiredLoader(args);
	return typedjson(mapUtil.toAppStateObject(await appState()));
};

export const action: ActionFunction = async () => {
	const app = await appState();
	await db.user.saveAll(app.users);
	return redirect(routesUtil.admin.panel);
};

const AdminPage: React.FC = () => {
	const state = useTypedLoaderData<typeof loader>();
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
