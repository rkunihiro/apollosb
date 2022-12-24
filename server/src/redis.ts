import { KeyValueCache, KeyValueCacheSetOptions } from "@apollo/utils.keyvaluecache";
import Redis from "ioredis";

export class RedisKeyValueCache implements KeyValueCache {
    private readonly client: Redis;

    constructor(uri: string) {
        this.client = new Redis(uri, {
            commandTimeout: 1000,
            connectTimeout: 1000,
            maxRetriesPerRequest: 1,
            reconnectOnError: () => 1,
            retryStrategy(times) {
                return Math.min(times * 1000, 60000);
            },
        });
    }

    async get(key: string): Promise<string | undefined> {
        try {
            const cache = await this.client.get(key);
            if (!cache) {
                return undefined;
            }
            return cache;
        } catch (err) {
            console.warn(`redis save failed ${key}`, err);
            return undefined;
        }
    }

    async set(key: string, value: string, options?: KeyValueCacheSetOptions | undefined): Promise<void> {
        try {
            const ttl = options?.ttl ?? 60;
            await this.client.setex(key, ttl, value);
        } catch (err) {
            console.warn(`redis set failed ${key}`, err);
        }
    }

    async delete(key: string): Promise<boolean | void> {
        try {
            const n = await this.client.del(key);
            return n === 1;
        } catch (err) {
            console.warn(`redis del failed ${key}`, err);
        }
    }
}

export const cache = new RedisKeyValueCache(process.env["REDIS_URL"] ?? "redis://localhost:6379");
