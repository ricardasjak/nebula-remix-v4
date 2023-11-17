export const mapUtil = {
	toValues: <K, V>(map: Map<K, V>) => Array.from(map, ([, v]) => v),
	toKeys: <K, V>(map: Map<K, V>) => Array.from(map, ([k]) => k),
};
