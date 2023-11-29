import { PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';

const KingdomMilitaryPage: React.FC = () => {
	const kd = useKingdom();
	return (
		<>
			<PageTitle title='Adjust kingdom military' />
			<h2>{kd.id}</h2>
		</>
	);
};

export default KingdomMilitaryPage;
