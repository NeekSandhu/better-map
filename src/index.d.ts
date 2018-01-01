declare class BetterMap<K, V> extends Map<K, V> {

    entriesArray(): Iterator<BetterMap<K, V>>;

    /**
     * Returns true if the Map contains given value
     *
     * Note: Uses reference comparison and not deep equality comparison
     */
    hasValue(value: V): boolean;

    /**
     * Returns new Map from elements in current Map that meet the condition specified in a callback function.
     * @param callback A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the Map.
     */
    filter(callback: (value: V, key: K,  map: BetterMap<K, V>) => boolean, thisArg?: any): BetterMap<K, V>;

    /**
     * Returns the key of the first element's key in the Map where predicate is true, and undefined
     * otherwise.
     * @param callback findKey calls predicate once for each element of the Map, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element's key. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findKey(callback: (value: V, key: K,  map: BetterMap<K, V>) => boolean, thisArg?: any): K;

    /**
     * Returns the value of the first element's key in the Map where predicate is true, and undefined
     * otherwise.
     * @param callback findKey calls predicate once for each element of the Map, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element's value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findValue(callback: (value: V, key: K,  map: BetterMap<K, V>) => boolean, thisArg?: any): V;

    /**
     * Returns { key, value } like object of the first element in the Map where predicate is true, and undefined
     * otherwise.
     * @param callback findKey calls predicate once for each element of the Map, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns an object like { key, value }. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find(callback: (value: V, key: K,  map: BetterMap<K, V>) => boolean, thisArg?: any): { key: K, value: V };

    /**
     * Returns an array of keys of this Map
     */
    keysArray(): K[];

    map<T>(callback: (value: V, key: K, map: BetterMap<K, V>) => T, thisArg?: any): T[];

    reduce<T>(callback: (previousValue: T, value: V, key: K) => void, initialValue: T): T;

    some(callback: (value: V, key: K) => boolean, thisArg?: any): boolean;

    stringify(): string;

    toObject(): { [key: string]: V };

    valuesArray(): V[];
}

export default BetterMap;
