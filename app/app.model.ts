import type { Kingdom } from '~/kingdom';

export interface AppState {
	kingdoms: Map<number, Kingdom>;
}
