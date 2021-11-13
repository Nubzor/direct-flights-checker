import {aeroDataBoxGotInstance as got} from "./common/gotInstance";
import { CachedObject, RoutesResponse } from "./common/types";
import FileCache from "./FileCache";

class Routes {
    private fileCache: FileCache;

    constructor() {
        this.fileCache = new FileCache(24 * 60); // 1 day in minutes
    }

    getAirportRoutes(icao: string): Promise<any> {
        return this
            .fileCache
            .getCachedItem(this.buildCacheKey(icao))
            .then((data: CachedObject) => {
                if (data.isValid?.()) {
                    return data.getItem?.();
                }

                return got(`airports/icao/${icao}/stats/routes/daily`)
                    .json<RoutesResponse>()
                    .then((json: RoutesResponse) => {
                        const { routes }: RoutesResponse = json;

                        this.fileCache.cacheItem(this.buildCacheKey(icao), routes);

                        return routes;
                    });
            })
            .catch(console.error);
    }

    private buildCacheKey(icao: string): string {
        return `airports_routes_${icao}.json`;
    }
}

export default Routes;