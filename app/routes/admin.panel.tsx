import { Form } from '@remix-run/react';
import { authRequiredLoader } from '~/loaders';

export const loader = authRequiredLoader;

const AdminPage: React.FC = () => {
	return (
		<div>
			<Form method='POST'>
				<button type={'submit'}>Save Users</button>
			</Form>
		</div>
	);
};

export default AdminPage;
