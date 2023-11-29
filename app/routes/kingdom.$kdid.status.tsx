import { PageTitle } from '~/components';
import { useKingdom, useKingdomStatus } from '~/hooks/use-kingdom.hook';

const KingdomStatusPage: React.FC = () => {
	const kdStatus = useKingdomStatus();
	const kd = useKingdom();
	return (
		<>
			<PageTitle title='Dear commander, review kingdom status' />
			<h2>Status page</h2>
			<pre>{JSON.stringify(kdStatus, null, 2)}</pre>
		</>
	);
};

export default KingdomStatusPage;
