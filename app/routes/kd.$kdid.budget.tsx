import { PageTitle } from '~/components';
import { useKingdom } from '~/hooks/use-kingdom.hook';

const KingdomBudgetPage: React.FC = () => {
	const kd = useKingdom();
	return (
		<>
			<PageTitle title='Adjust kingdom budget' />
			<h2>{kd.id}</h2>
		</>
	);
};

export default KingdomBudgetPage;
