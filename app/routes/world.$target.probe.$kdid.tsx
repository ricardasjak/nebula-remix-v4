import { type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { PageTitle } from '~/components';
import { useSubmitting } from '~/hooks';

export const action = (args: ActionFunctionArgs) => {
	return { success: true };
};

const ProbePage: React.FC = () => {
	const pending = useSubmitting();
	return (
		<div>
			<PageTitle title='Probes Panel' className='text-primary' />
			<Form method='post' className={'grid lg:w-1/2 lg:grid-cols-2 gap-4 mt-4'}>
				<label htmlFor='race'>Choose mission</label>
				<select name='race' className={'select select-primary'} required>
					<option value={1}>Spy Kingdom</option>
					<option value={1}>Spy Military</option>
				</select>

				<label htmlFor='probes'>Probes count</label>
				<input
					name='probes'
					type='number'
					className={'input input-primary'}
					min={0}
					max={99999999}
				></input>

				<label></label>
				<button type='submit' className={'btn btn-primary'} disabled={pending}>
					Probe!
				</button>
				<label></label>
				<pre>Doesn't work...</pre>
			</Form>
		</div>
	);
};

export default ProbePage;
