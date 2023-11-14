import { PlanetTypes, RaceTypes } from '~/kingdom';

const CreateKingdomPage = () => {

	return (
		<div className={'content'}>
			<h1 className={'size text- mb-4 text-xl font-bold'}>
				{"Dear commander, it's time to start your kingdom"}
			</h1>
			<form className={'grid w-1/2 grid-cols-2 gap-4'}>
				<label htmlFor='nickname'>Kingdom name</label>
				<input name='name' type='text' className={'input input-primary'} required minLength={3}></input>

				<label htmlFor='nickname'>Ruler name</label>
				<input name='ruler' type='text' className={'input input-primary'} required minLength={3}></input>

				<label htmlFor='planet'>Planet type</label>
				<select name='planet' className={'select select-primary'} required>
					{PlanetTypes.map((pt) => (
						<option value={pt} key={pt}>
							{pt}
						</option>
					))}
				</select>

				<label htmlFor='race'>Race type</label>
				<select name='race' className={'select select-primary'} required>
					{RaceTypes.map((rt) => (
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
		</div>
	);

}

export default CreateKingdomPage;
