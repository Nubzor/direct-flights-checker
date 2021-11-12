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
    item: Array<any> | object | null;
    isValid?: () => boolean;
    getItem?: () => Array<any> | object | null;
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