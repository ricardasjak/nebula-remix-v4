import { useLoaderData } from '@remix-run/react';
import { kingdomLoader } from '~/kingdom/kingdom.loader';

export const loader = kingdomLoader;

const KingdomPage: React.FC = () => {
	const kd = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>This is kingdom page</h1>
			<pre>{JSON.stringify(kd, null, 2)}</pre>
		</div>
	);
};

export default KingdomPage;
