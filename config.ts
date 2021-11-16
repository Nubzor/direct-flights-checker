import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import { APIConfig, CacheConfig, ServerConfig } from "./src/common/types";

export const AERODATABOX_API_CONFIG: APIConfig = {
    key: process.env.AERODATABOX_API_KEY || '',
    url: 'https://aerodatabox.p.rapidapi.com/',
};

export const AVIATION_EDGE_API_CONFIG: APIConfig = {
    key: process.env.AVIATION_API_KEY || '',
    url: 'https://aviation-edge.com/v2/public/',
}

export const CACHE_CONFIG: CacheConfig = {
    cacheDirectory: path.join(__dirname, "src", "cache"),
    cacheDuration: Number.MAX_SAFE_INTEGER, // indefinite
}

export const SERVER_CONFIG: ServerConfig = {
    DEFAULT_PORT: 3000,
}