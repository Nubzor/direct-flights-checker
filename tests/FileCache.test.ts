import fs from 'fs';
import path from 'path';

import FileCache from '@src/FileCache';
import { CachedObject } from '@src/common/types';

const dir = path.join(__dirname, 'testCache');

beforeAll(() => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
});

afterAll(() => {
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
    }
});

describe("A FileCache class tests", () => {
    const fileCache = new FileCache(3600, dir);
    const cacheName = 'cacheTestFile.txt';
    const cacheData = { foo: 'bar '};

    afterEach(() => {
        const cacheFilePath = path.join(dir, cacheName);

        if (fs.existsSync(cacheFilePath)) {
            fs.unlinkSync(cacheFilePath);
        }
    });

    test('if caching items to file works properly', () => {
        return fileCache
                .cacheItem(cacheName, { foo: 'bar' })
                .then(status => expect(status).toBe(true));
    });

    test('if cache item is actually saved to file', () => {
        return fileCache
                .cacheItem(cacheName, { foo: 'bar' })
                .then(status => {
                    expect(fs.existsSync(path.join(dir, 'cacheTestFile.txt'))).toBe(true);
                });
    })

    test('if retreving data from cache returns value', () => {
        fileCache.cacheItem(cacheName, cacheData);

        return fileCache
                .getCachedItem(cacheName)
                .then(cacheData => {
                    expect(typeof cacheData).toBe('object');
                });
    });

    test('if retreving data is wrapped by the cacheObject methods', () => {
        return fileCache.cacheItem(cacheName, cacheData)
                .then(status => {
                    return fileCache
                        .getCachedItem(cacheName)
                        .then((cacheObject: CachedObject)  => {
                            expect(typeof cacheObject.getItem).toBe('function');
                            expect(typeof cacheObject.isValid).toBe('function');
                            
                            expect(cacheObject.getItem?.()).toStrictEqual(cacheData);
                        });
                });
    });
});