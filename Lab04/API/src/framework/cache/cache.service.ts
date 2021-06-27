import NodeCache from 'node-cache';

export class CacheService {
  constructor(private myCache: NodeCache) {}
  
  public get<T>(key: string): T {
    return this.myCache.get<T>(key);
  }
  
  public set<T>(key: string, value: T, ttlInSeconds?: number): void {
    this.myCache.set<T>(key, value, ttlInSeconds);
  }

  public async wrap<T>(
    key: string, 
    runFunc: () => Promise<T>,
    ttlInSeconds?: number, 
    cacheUndefined = true  
  ): Promise<T> {
    let cachedValue: T = await this.get(key);
    if (cachedValue) return cachedValue;

    cachedValue = await runFunc();
    if (cachedValue !== undefined || cacheUndefined) 
      this.set(key, cachedValue, ttlInSeconds);

    return cachedValue;
  }

  public del(key: string): void {
    this.myCache.del(key);
  }

  public deleteAllKeysThatStartWith(prefix: string): void {
    for (const key of this.myCache.keys()) {
      if (key.toLowerCase().startsWith(prefix.toLowerCase())) {
        this.myCache.del(key);
      }
    }
  }
}