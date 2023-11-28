import { Redis } from '@upstash/redis';
import { type Budget, type Player, type User } from '~/app.model';
import { type Entity, type Kingdom } from '~/kingdom';
import { mapUtil } from '~/utils';

const redis = Redis.fromEnv();
const KEYS = {
	users: 'users',
	players: 'players',
	kingdoms: 'kingdoms',
	budgets: 'budgets',
};

const makeRepository = <T>(key: string) => ({
	loadAll: async (map: Map<number, T>) => {
		console.time(`redis: ${key}: load all`);
		const data = (await redis.hgetall(key)) as Record<number, T> | undefined;
		map = mapUtil.toMap(data);
		console.timeEnd(`redis: ${key}: load all`);
		return map;
	},
	saveAll: async (map: Map<number, T>) => {
		console.time(`redis: save all of ${key}`);

		const n = await redis.hset(key, Object.fromEntries(map));
		console.timeEnd(`redis: save all of ${key}`);
		return n;
	},
	/**
	 * Update or Create new entity of <T>
	 */
	saveOne: async (entity: Entity) => {
		console.time(`redis: ${key}: saved id: ${entity.id}`);
		console.log(`redis: ${key}: saving id: ${entity.id}`);
		await redis.hset(key, { [entity.id]: entity });
		console.timeEnd(`redis: ${key}: saved id: ${entity.id}`);
		return 0;
	},
	createOne: async (entity: Entity) => {
		console.log(`redis: ${key}: creating entity ${JSON.stringify(entity)}`);
		const n = await redis.hexists(key, entity.id.toString());
		if (n > 0) throw `${key}: entity already exists`;
		return makeRepository(key).saveOne(entity);
	},
});

export const db = {
	user: makeRepository<User>(KEYS.users),
	player: makeRepository<Player>(KEYS.players),
	kingdom: makeRepository<Kingdom>(KEYS.kingdoms),
	budget: makeRepository<Budget>(KEYS.budgets),
};
