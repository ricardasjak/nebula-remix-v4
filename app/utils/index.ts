export * from './map.util';
export * from './now.util';

export const formatNumber = (val: number): string => val.toLocaleString();
export const formatDiff = (val: number): string =>
	val > 0 ? `+${val.toLocaleString()}` : `${val.toLocaleString()}`;
