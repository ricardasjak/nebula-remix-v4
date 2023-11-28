import { PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';

const KingdomStatusPage: React.FC = () => {
	const kd = useKingdom();
	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />
			<h2>Status page</h2>
			<pre>{JSON.stringify(kd)}</pre>
		</>
	);
};

export default KingdomStatusPage;
