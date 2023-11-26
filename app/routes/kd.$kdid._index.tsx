import { useKingdom } from '~/hooks/use-kingdom.hook';

const KingdomPage: React.FC = () => {
	const kd = useKingdom();
	return (
		<div>
			<h1>This is kingdom page</h1>
			<pre>{JSON.stringify(kd, null, 2)}</pre>
		</div>
	);
};

export default KingdomPage;
