import { type Kingdom } from '~/kingdom';

export interface UserSession {
	userId: number;
	clerkUserId: string;
	email: string;
}

export interface User {
	userId: number;
	clerkUserId?: string;
	email: string;
	lastActiveAt?: string;
	// passwordHash: string;
}

export interface AppState {
	kingdoms: Map<number, Kingdom>;
	users: Map<number, User>;
	status: 'empty' | 'loading' | 'ready';
}
