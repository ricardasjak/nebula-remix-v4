import { type KingdomStatus, type Military } from '~/app.model';
import { kdUtil, type Kingdom, PT_LABEL, RACE_LABEL } from '~/kingdom';
import { formatNumber } from '~/utils';

export interface KingdomStatusProps {
	kingdom: Kingdom;
	status: KingdomStatus;
	military: Military;
}

const StatLine: React.FC<{ label: string; value?: number | string }> = ({ label, value }) => {
	return (
		<div className='flex flex-row'>
			<label>{label}:</label>&nbsp;
			<span className='font-bold'>
				{typeof value === 'number' ? formatNumber(value || 0) : value}
			</span>
		</div>
	);
};

export const KingdomStatusComponent: React.FC<KingdomStatusProps> = ({
	kingdom,
	status,
	military,
}) => {
	return (
		<div className='grid grid-cols-1'>
			<h2 className='text-xl text-primary font-bold mb-2'>{kdUtil.getKingdomNameXY(kingdom)}</h2>
			<StatLine label='Ruler' value={kingdom.ruler} />
			<StatLine label='Planet' value={PT_LABEL[kingdom.planet]} />
			<StatLine label='Race' value={RACE_LABEL[kingdom.race]} />
			<br />
			<StatLine label='Land' value={status.land} />
			<StatLine label='Networth' value={status.nw} />
			<StatLine label='Population' value={status.pop} />
			<StatLine label='Probes' value={status.probes} />
			<br />
			<StatLine label='Income' value={status.income} />
			<StatLine label='Money' value={status.money} />
			<StatLine label='Power' value={status.power} />
			<StatLine label='Power Change' value={status.powerChange} />
			<br />
			<StatLine label='Soldiers' value={military.sold} />
			<StatLine label='Troopers' value={military.tr} />
			<StatLine label='Laser troopers' value={military.lt} />
			<StatLine label='Tanks' value={military.t} />
			<StatLine label='Scientists' value={military.sci} />
		</div>
	);
};
