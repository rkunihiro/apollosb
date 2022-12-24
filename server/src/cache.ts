import { KeyValueCache, KeyValueCacheSetOptions } from "@apollo/utils.keyvaluecache";

interface CacheData {
    /** @type cache data */
    value: string;

    /** @type expire timestamp millisecond */
    expire: number;
}

export class MemoryKeyValueCache implements KeyValueCache {
    private readonly storage: Map<string, CacheData>;

    constructor() {
        this.storage = new Map<string, CacheData>();
    }

    async get(key: string): Promise<string | undefined> {
        const cache = this.storage.get(key);
        if (!cache) {
            console.debug(`cache miss ${key}`);
            return;
        }
        if (cache.expire < performance.now()) {
            console.debug(`cache miss(expired) ${key}`);
            this.storage.delete(key);
            return;
        }
        console.debug(`cache hit ${key}`);
        return cache.value;
    }

    async set(key: string, value: string, options?: KeyValueCacheSetOptions | undefined): Promise<void> {
        const ttl = options?.ttl ?? 86400;
        const expire = performance.now() + ttl * 1000;
        this.storage.set(key, { value, expire });
        console.debug(`cache saved ${key}`, JSON.stringify({ value, ttl }));
    }

    async delete(key: string): Promise<boolean | void> {
        this.storage.delete(key);
        console.debug(`cache delete ${key}`);
    }
}

export const cache = new MemoryKeyValueCache();

export default cache;
