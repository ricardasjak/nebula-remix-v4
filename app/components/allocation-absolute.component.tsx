import { cx } from '~/cx';
import { allocationUtil } from '~/utils/allocation.util';

interface Props<T> {
	values: Record<keyof T, number | undefined>;
	nextValues?: Record<keyof T, number | undefined>;
	labels: Partial<Record<keyof T, string>>;
	maxValue?: number;
	total?: number;
	readOnly?: boolean;
}

export function AllocationAbsolute<T>({
	values,
	nextValues,
	labels,
	total = 0,
	maxValue,
	readOnly,
}: Props<T>) {
	const allocations = values ? (Object.keys(labels) as Array<keyof T>) : [];
	const balance = 100 - allocationUtil.balance(values);
	let maxValue1 = maxValue;
	if (!maxValue1) {
		maxValue1 = (Object.keys(values) as Array<keyof typeof values>).reduce(
			(acc, key) => Math.max(acc, values[key] || 0),
			0
		);
	}

	return (
		<div>
			<ul className={'list'}>
				{allocations.map((aloc, index) => {
					const val = values[aloc] || 0;
					const ratio = maxValue ? (100 * val) / maxValue : undefined;
					const diff = nextValues ? (nextValues[aloc] || 0) - (values[aloc] || 0) : 0;
					return (
						<li key={index}>
							<span className={'text-sm'}>
								{labels[aloc]}:{' '}
								{ratio
									? `${val.toLocaleString()} (${ratio.toLocaleString(undefined, {
											maximumFractionDigits: 1,
									  })}%)`
									: `${val.toLocaleString()}`}
								{diff > 0 ? <span className={'text-secondary'}>&nbsp;+{diff}</span> : null}
							</span>
							<input
								type='range'
								name={aloc.toString()}
								min={0}
								max={maxValue1}
								step={1}
								value={val}
								className={readOnly ? 'range' : 'range range-primary'}
								readOnly={true}
							/>
						</li>
					);
				})}
			</ul>
			{!readOnly && (
				<h3 className={cx({ 'text-primary animate-pulse': balance < 100 })}>
					Total allocation: {balance}%
				</h3>
			)}
		</div>
	);
}
