import { GAME } from '~/game.const';

export const tickProbes = (probes: number, probeFactories: number) => {
	const newValue = Math.min(
		probes + probeFactories * GAME.probes.pfOutput,
		probeFactories * GAME.probes.pfLimit
	);
	return Math.max(Math.floor(newValue), probes);
};
