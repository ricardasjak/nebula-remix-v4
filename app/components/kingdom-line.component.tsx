import React from 'react';
import { useKingdom } from '~/hooks';

export const KingdomLine: React.FC = () => {
	const kd = useKingdom();
	if (!kd) {
		return null;
	}
	return (
		<div className={'flex flex-col'}>
			<div className={'flex flex-row text-xs gap-1'}>
				<span className={'text-primary text-sm'}>{kd.name}</span>
				<span className={'text-primary text-sm hidden sm:inline'}>{`(x:${kd.x}, y:${kd.y})`}</span>
			</div>
			<div className={'flex flex-row text-xs gap-4'}>
				<span>{kd.planet}</span>
				<span>{kd.race}</span>
				<span>{kd.land.toLocaleString()}</span>
				<span>{kd.nw.toLocaleString()}</span>
			</div>
		</div>
	);
};
