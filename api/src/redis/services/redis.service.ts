import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private readonly DEFAULT_TTL = 10;
  private readonly LOGGER = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  set(key: string, content: string) {
    const ttl = process.env.REDIS_TTL
      ? Number(process.env.REDIS_TTL)
      : this.DEFAULT_TTL;

    this.LOGGER.log(`setting key ${key}, ttl ${ttl}`);

    return this.cacheManager.set(key, content, {
      ttl,
    });
  }

  get(key: string): Promise<string> {
    this.LOGGER.log(`querying key ${key}`);
    return this.cacheManager.get(key);
  }

  delete(key: string) {
    this.LOGGER.log(`removing ${key}`);
    return this.cacheManager.del(key);
  }
}
