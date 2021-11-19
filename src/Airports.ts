import {aeroDataBoxGotInstance as got} from "./common/gotInstance";
import { AirportModel, AirportResponse, CachedObject } from "./common/types";
import FileCache from "./FileCache";

class Airports {
    private radius: number;
    private limit: number;

    private cacheKey: string;

    private fileCache: FileCache;

    constructor(radius: number, limit: number) {
        this.radius = radius;
        this.limit = limit;

        this.cacheKey = "airports.json";

        this.fileCache = new FileCache(14 * 24 * 60); // 14 days in minutes
    }


        getAirportsByCoorindates(lat: number, lon: number): Promise<any> {
        return this
            .fileCache
            .getCachedItem(this.cacheKey)
            .then((data: CachedObject) => {
                if (data.isValid?.()) {
                    return data.getItem?.();
                }

                return got(`airports/search/location/${lat}/${lon}/km/${this.radius}/${this.limit}`)
                    .json<AirportResponse>()
                    .then((json: AirportResponse) => {
                        const { items }: AirportResponse = json;

                        const airports: Array<AirportModel> = items.filter((airport: AirportModel) => {
                            return airport.countryCode === 'PL';
                        })

                        this.fileCache.cacheItem(this.cacheKey, airports);

                        return airports;
                    })
                    .catch(console.error);
            })
            .catch(console.error);
    }
}


export default Airports;