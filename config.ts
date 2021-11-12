import path from 'path';

import { APIConfig, CacheConfig, ServerConfig } from "./src/common/types";

export const API_CONFIG: APIConfig = {
    key: process.env.API_KEY || '',
    url: 'https://aerodatabox.p.rapidapi.com/',
};

export const CACHE_CONFIG: CacheConfig = {
    cacheDirectory: path.join(__dirname, "src", "cache"),
    cacheDuration: 3600, // 1h in minutes
}

export const SERVER_CONFIG: ServerConfig = {
    DEFAULT_PORT: 3000,
}