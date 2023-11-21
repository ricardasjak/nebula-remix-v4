export const mapUtil = {
	toValues: <K, V>(map: Map<K, V>) => Array.from(map, ([, v]) => v),
	toKeys: <K, V>(map: Map<K, V>) => Array.from(map, ([k]) => k),
	nextKey: (map: Map<string | number, any>) => {
		const keys = mapUtil.toKeys(map);
		const last = keys[keys.length - 1] as string;
		return (parseInt(last, 10) || 0) + 1;
	},
};
