import { type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { attackActionFn } from '~/actions/attack.action';
import { PageTitle } from '~/components';
import { useSubmitting } from '~/hooks';
import { playerKingdomsLoader } from '~/loaders';

export const loader = playerKingdomsLoader;

export const action = (args: ActionFunctionArgs) => {
	// const {kdid, target } = args.params;

	return attackActionFn(args);
};

const AttackPage: React.FC = () => {
	const pending = useSubmitting();
	return (
		<div>
			<PageTitle title='Attack Panel' className='text-primary' />
			<Form method='post' className={'grid lg:w-1/2 grid-cols-2 gap-4 mt-4'}>
				<label htmlFor='soldiers'>Soldiers</label>
				<input
					name='soldiers'
					type='number'
					className={'input input-primary input-sm text-right'}
					min={0}
					max={99999999}
				></input>

				<label htmlFor='soldiers'>Troopers</label>
				<input
					name='troopers'
					type='number'
					className={'input input-primary input-sm text-right'}
					min={0}
					max={99999999}
				></input>

				<label htmlFor='soldiers'>Tanks</label>
				<input
					name='tanks'
					type='number'
					className={'input input-primary input-sm text-right'}
					min={0}
					max={99999999}
				></input>
				<label className='col-span-2'>Choose attack direction</label>
				<div className='col-span-2 grid grid-cols-2 gap-4'>
					<div className='form-control'>
						<label className='label cursor-pointer'>
							<span className='label-text'>North</span>
							<input
								type='radio'
								name='side'
								value='n'
								className='radio radio-sm checked:bg-blue-500'
								required
							/>
						</label>
					</div>
					<div className='form-control'>
						<label className='label cursor-pointer'>
							<span className='label-text'>East</span>
							<input
								type='radio'
								name='side'
								value='e'
								className='radio radio-sm checked:bg-cyan-400'
								required
							/>
						</label>
					</div>
					<div className='form-control'>
						<label className='label cursor-pointer'>
							<span className='label-text'>West</span>
							<input
								type='radio'
								name='side'
								value='w'
								className='radio radio-sm checked:bg-orange-400'
								required
							/>
						</label>
					</div>
					<div className='form-control'>
						<label className='label cursor-pointer'>
							<span className='label-text'>South</span>
							<input
								type='radio'
								name='side'
								value='s'
								className='radio radio-sm checked:bg-yellow-200'
								required
							/>
						</label>
					</div>
				</div>

				<button type='submit' className={'col-span-2 btn btn-primary'} disabled={pending}>
					Attack!
				</button>
				<label></label>
				<pre>Doesn't work...</pre>
			</Form>
		</div>
	);
};

export default AttackPage;
