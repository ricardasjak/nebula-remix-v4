import { cx } from '~/cx';
import { type WorldKingdom } from '~/loaders/world.loader';

interface Props {
	kingdoms: WorldKingdom[];
	ownerKingdoms: number[];
}

const SIZE = 100;

export const WorldMap: React.FC<Props> = ({ kingdoms, ownerKingdoms }) => {
	return (
		<div
			className={''}
			style={{
				width: '100%',
				maxWidth: '720px',
				margin: '0 auto',
				aspectRatio: 1,
				display: 'grid',
				gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
				gridTemplateRows: `repeat(${SIZE}, 1fr)`,
			}}
		>
			{kingdoms.map(k => {
				const isOwner = ownerKingdoms.includes(k.id);
				const tooltip = [
					`${k.name} (${k.x}:${k.y})`,
					k.land.toLocaleString(),
					k.nw.toLocaleString(),
				].join('   ');
				return (
					<div
						className={cx(isOwner ? 'bg-primary' : 'bg-blue-200', 'tooltip cursor-pointer')}
						data-tip={tooltip}
						style={{ gridRow: `${k.x}`, gridColumn: `${k.y}`, borderRadius: '2px' }}
						key={k.id}
					></div>
				);
			})}
		</div>
	);
};
