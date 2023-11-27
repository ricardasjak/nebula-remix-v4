import { cx } from '~/cx';
import { allocationUtil } from '~/utils/allocation.util';

interface Props<T> {
	values: Record<keyof T, number>;
	labels: Record<keyof T, string>;
	total?: number;
	onChange: (value: Record<keyof T, number>) => void;
}
// export const Aaaa: React.FC<Props<T>> = (props) => null;

export function Allocation<T>({ values, labels, total = 0, onChange }: Props<T>) {
	const allocations = Object.keys(values) as Array<keyof T>;
	const balance = 100 - allocationUtil.balance(values);

	const handleChange = (key: keyof T) => (e: React.FormEvent<HTMLInputElement>) => {
		const value = Number(e.currentTarget.value);
		onChange(allocationUtil.normalize(key, value, values));
	};

	return (
		<div>
			<ul className={'list'}>
				{allocations.map((aloc, index) => {
					const rate = values[aloc];
					const part = Math.floor((total * rate) / 100.0);
					return (
						<li key={index}>
							<span className={'text-sm'}>
								{labels[aloc]}: {part ? `${part.toLocaleString()} (${rate}%)` : `${rate}%`}
							</span>
							<input
								type='range'
								name={aloc.toString()}
								min={0}
								max={100}
								step={1}
								value={values[aloc]}
								className='range range-primary'
								onChange={handleChange(aloc)}
							/>
						</li>
					);
				})}
			</ul>
			<h3 className={cx({ 'text-primary animate-pulse': balance < 100 })}>
				Total allocation: {balance}%
			</h3>
		</div>
	);
}

// export const Allocation = (props: Props<T>) => {
// 	const allocations = Object.keys(value);
// 	return (
// 		<div>
// 			{allocations.map((aloc, index) => {
// 				return (
// 					<li key={aloc}>
// 						<input type='range' min={0} max='100' value='40' className='range range-primary' />
// 					</li>
// 				);
// 			})}
// 		</div>
// 	);
// };
