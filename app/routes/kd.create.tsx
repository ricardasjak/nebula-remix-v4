import { useLoaderData } from '@remix-run/react';
import { GAME } from '~/game.const';
import { PlanetTypes, RaceTypes } from '~/kingdom';
import { createKingdomAction } from '~/kingdom/createKingdom.action';
import { getAllKingdomsLoader } from '~/kingdom/getAllKingdoms.loader';

export const action = createKingdomAction;
export const loader = getAllKingdomsLoader;
// export function ErrorBoundary() {
// 	const error = useRouteError();
// 	return (
// 		<div>
// 			<h1>Some error happened:</h1>
// 			{/*<article>{error}</article>*/}
// 		</div>
// 	);
// 	// When NODE_ENV=production:
// 	// error.message = "Unexpected Server Error"
// 	// error.stack = undefined
// }

const CreateKingdomPage = () => {
	return (
		<div className={'content'}>
			<div className={'mb-8'}>
				<h1 className={'size text- mb-1 text-xl font-bold'}>
					{"Dear commander, it's time to start your kingdom"}
				</h1>
				<h2 className={'size text- mb-4 text-md'}>
					{`You can create up to ${GAME.kingdomsLimit} kingdoms`}
				</h2>
			</div>
			<form method='post' className={'grid lg:w-1/2 lg:grid-cols-2 gap-4 mt-4'}>
				<label htmlFor='nickname'>Kingdom name</label>
				<input
					name='name'
					type='text'
					className={'input input-primary'}
					required
					minLength={3}
					maxLength={20}
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
					Create .
				</button>
			</form>
		</div>
	);
};

export default CreateKingdomPage;
