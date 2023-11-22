import { type Kingdom } from '~/kingdom';

export interface UserSession {
	userId: number;
	clerkUserId: string;
	email: string;
}

export interface User {
	id: number;
	clerkUserId?: string;
	email: string;
	lastActiveAt?: string;
}

export interface Player {
	id: number;
	userId: number;
	round: number;
	kingdoms: number[];
}

export interface AppState {
	users: Map<number, User>;
	players: Map<number, Player>;
	kingdoms: Map<number, Kingdom>;
	status: 'empty' | 'loading' | 'ready';
}
