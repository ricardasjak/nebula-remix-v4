import { type ActionFunction, type LoaderFunction, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { appState } from '~/app.service';
import { makeCoords } from '~/game-logic';
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
	const kingdoms = mapUtil.toValues(app.kingdoms);
	kingdoms.forEach(kd => {
		const { x, y } = makeCoords();
		kd.x = x;
		kd.y = y;
	});

	await db.kingdom.saveAll(app.kingdoms);
	return redirect(routesUtil.admin.migrate);
};

const AdminMigratePage: React.FC = () => {
	const state = useLoaderData<typeof loader>();
	return (
		<div>
			<Form method='POST'>
				<button type={'submit'} className={'btn btn-primary'}>
					Execute data migration
				</button>
			</Form>
			<pre>{JSON.stringify(state.kingdoms, null, 2)}</pre>
		</div>
	);
};

export default AdminMigratePage;
