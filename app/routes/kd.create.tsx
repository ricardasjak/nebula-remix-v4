import type { ActionFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { appState } from '~/app.service';
import type { CreateKingdom, Kingdom, PlanetType, RaceType } from '~/kingdom';
import { PlanetTypes, RaceTypes } from '~/kingdom';
import { createKingdomAction } from '~/kingdom/createKingdom.action';
import { getAllKingdomsLoader } from '~/kingdom/getAllKingdoms.loader';

export const action = createKingdomAction;
export const loader = getAllKingdomsLoader;

const CreateKingdomPage = () => {
	const data = useLoaderData<typeof getAllKingdomsLoader>();
	return (
		<div className={'content'}>
			<h1 className={'size text- mb-4 text-xl font-bold'}>
				{"Dear commander, it's time to start your kingdom"}
			</h1>
			<form method='post' className={'grid w-1/2 grid-cols-2 gap-4'}>
				<label htmlFor='nickname'>Kingdom name</label>
				<input
					name='name'
					type='text'
					className={'input input-primary'}
					required
					minLength={3}
				></input>

				<label htmlFor='nickname'>Ruler name</label>
				<input
					name='ruler'
					type='text'
					className={'input input-primary'}
					required
					minLength={3}
				></input>

				<label htmlFor='planet'>Planet type</label>
				<select name='planet' className={'select select-primary'} required>
					{PlanetTypes.map(pt => (
						<option value={pt} key={pt}>
							{pt}
						</option>
					))}
				</select>

				<label htmlFor='race'>Race type</label>
				<select name='race' className={'select select-primary'} required>
					{RaceTypes.map(rt => (
						<option value={rt} key={rt}>
							{rt}
						</option>
					))}
				</select>

				<label></label>
				<button type='submit' className={'btn btn-primary'}>
					Create Kingdom
				</button>
			</form>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default CreateKingdomPage;
