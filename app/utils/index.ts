export * from './game.util';
export * from './map.util';
export * from './now.util';
export * from './probes.util';

export const formatNumber = (val: number): string => val.toLocaleString();
export const formatDiff = (val: number): string =>
	val > 0 ? `+${val.toLocaleString()}` : `${val.toLocaleString()}`;
/**
 * Returns random whole number from 1 to 100
 */
export const randomNumber = () => Math.ceil(Math.random() * 100);
