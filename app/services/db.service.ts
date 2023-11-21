import { Redis } from '@upstash/redis';
import { type User } from '~/app.model';

const redis = Redis.fromEnv();
const KEYS = {
	users: 'users',
};

const user = {
	saveAll: async (users: Map<number, User>) => {
		console.time('redis: save all users');
		const n = await redis.hset(KEYS.users, Object.fromEntries(users));
		console.timeEnd('redis: save all users');
		return n;
	},
	saveOne: async (user: User) => {
		console.time('redis: save one user');
		const n = await redis.hsetnx(KEYS.users, user.userId.toString(), user);
		if (n === 0) throw `User ${user.userId}/${user.clerkUserId} wasn't saved`;
		console.timeEnd('redis: save one user');
		return n;
	},
	createOne: async (user: User) => {
		const exists = await redis.hexists(KEYS.users, user.userId.toString());
		if (exists) throw 'User already exists';
		return db.user.saveOne(user);
	},
};

export const db = {
	user,
};
