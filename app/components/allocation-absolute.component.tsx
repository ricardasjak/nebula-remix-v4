import { useState } from 'react';
import { cx } from '~/cx';
import { allocationUtil } from '~/utils/allocation.util';

interface Props<T> {
	initial: Record<keyof T, number>;
	labels: Record<keyof T, string>;
	maxValue: number;
	total?: number;
	readOnly?: boolean;
}

export function AllocationAbsolute<T>({
	initial,
	labels,
	total = 0,
	maxValue,
	readOnly,
}: Props<T>) {
	const values = initial;
	const allocations = values ? (Object.keys(labels) as Array<keyof T>) : [];
	const balance = 100 - allocationUtil.balance(values);

	return (
		<div>
			<ul className={'list'}>
				{allocations.map((aloc, index) => {
					const val = values[aloc] || 0;
					const ratio = (100 * val) / maxValue;
					return (
						<li key={index}>
							<span className={'text-sm'}>
								{labels[aloc]}:{' '}
								{ratio
									? `${val.toLocaleString()} (${ratio.toLocaleString(undefined, {
											maximumFractionDigits: 2,
									  })}%)`
									: `${val.toLocaleString()}`}
							</span>
							<input
								type='range'
								name={aloc.toString()}
								min={0}
								max={maxValue}
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
