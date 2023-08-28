import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private DEFAULT_TTL = 10000;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  set(key: string, content: string) {
    return this.cacheManager.set(
      key,
      content,
      process.env.TTL || this.DEFAULT_TTL,
    );
  }

  get(key: string) {
    return this.cacheManager.get(key);
  }
}
