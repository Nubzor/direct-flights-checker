import fs from 'fs';
import path from 'path';

import { CACHE_CONFIG } from '../config';
import { CachedObject, CacheItem } from './common/types';

class FileCache {
    private cacheDirectory: string;
    private cacheDuration: number;

    constructor(cacheDurationInSeconds?: number, cacheDirectory?: string) {
        this.cacheDirectory = cacheDirectory || CACHE_CONFIG.cacheDirectory;
        this.cacheDuration = cacheDurationInSeconds || CACHE_CONFIG.cacheDuration;
    }

    cacheItem(cacheName: string, cacheItem: CacheItem): Promise<CacheItem> {
        const cacheObject: CachedObject = {
            validUntil: Date.now() + this.cacheDuration * 1000,
            item: cacheItem,
        };

        return new Promise((resolve, reject) => {
            fs.writeFile(this.getCachePath(cacheName), JSON.stringify(cacheObject), err => {
               if (err) {
                   return reject(err);
               }

               resolve(true);
            });
        });
    }

    getCachedItem(cacheName: string): Promise<CachedObject> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.getCachePath(cacheName), 'utf-8', (err, data) => {
                if (err) {
                    console.error('Can\'t open file with cache in getCachedItem method, probably the file doesn\'t exist');
                }

                let cachedObject: CachedObject = {
                    validUntil: 0,
                    item: null,
                }

                // undefined due to error in opening or empty file
                if (!data || data === '') {
                    return resolve(Object.freeze(cachedObject));
                }

                try {
                    cachedObject = JSON.parse(data);
                } catch(e) {
                    console.warn('Could\'t get cached items', e);
                }

                cachedObject.isValid = function() {
                    return this.validUntil >= Date.now(); 
                }

                cachedObject.getItem = function(): any {
                    const _cacheName: string = cacheName;

                    console.info('Retreving data from cache!', _cacheName);

                    return this.item;
                }

                resolve(Object.freeze(cachedObject));
            });
        })
    }

    private cacheItemExists(cacheName: string) {
        return new Promise(resolve => {
            fs.access(this.getCachePath(cacheName), err => {
                if (err) {
                    resolve(false);
                }

                resolve(true);
            });
        });
    }

    private getCachePath(cacheItemPath: string): string {
        return path.join(this.cacheDirectory, cacheItemPath);
    }
}

export default FileCache;