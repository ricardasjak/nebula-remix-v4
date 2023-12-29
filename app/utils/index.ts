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

export const padZero = (n: number) => (n >= 10 ? n.toString() : `0${n}`);

export const plural = (n: number, noun: string) => `${n} ${noun}${n === 1 ? '' : 's'}`;

export const timeDiff = (diff: number) => {
	const sec = Math.floor(diff / 1000);
	if (sec < 60) {
		return `${plural(sec, 'second')}`;
	}
	if (sec < 3600) {
		// return `${plural(Math.floor(sec / 60), 'minute')}`;
		return `${Math.floor(sec / 60)} min`;
	}
	if (sec < 24 * 3600) {
		const hh = Math.floor(sec / 3600);
		const mm = Math.floor((sec % 3600) / 60);
		// const ss = padZero((sec % 3600) % 60);
		return `${hh} hr ${mm} min`;
	}
	if (sec < 24 * 3600) {
		return `${plural(Math.floor(sec / 3600), 'hour')}`;
	}
	return `${plural(Math.floor(sec / (24 * 3600)), 'day')}`;
};
