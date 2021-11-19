declare global {
    interface Date {
        addDays (days?: number) : Date;
    }
}

export interface APIConfig {
    key: string;
    url: string;
}

export interface CacheConfig {
    cacheDirectory: string;
    cacheDuration: number;
}

export interface ServerConfig {
    DEFAULT_PORT: number;
}

export interface CachedObject {
    validUntil: number;
    item: CacheItem;
    isValid?: () => boolean;
    getItem?: () => Array<any> | object | null;
}

export type CacheItem = { [key: string]: any; } | Array<{[ key: string]: any; }> | string | number
export type RouteItems = { [key: string]: RouteItem };
export type RouteItem = {
    [key: string]: any;
}


export interface AirportResponse {
    items: Array<AirportModel>
}

export interface AirportModel {
    icao: string;
    iata: string;
    name: string;
    shortName: string;
    municipalityName: string;
    location: {
        lat: number;
        lon: number;
    };
    countryCode: string;
}

export interface RoutesResponse {
    routes: Array<RouteModel>;
}

export interface RouteModel {
    destination: {
        icao: string;
        iata: string;
        name: string;
        shortName: string;
        municipalityName: string;
        location: {
            lat: number;
            lon: number;
        }
    };
    averageDailyFlights: number;
    operators: Array<{
        name: string;
    }>
}