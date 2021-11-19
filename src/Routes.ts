import { aviationEdgeGotInstance as got } from "./common/gotInstance";
import { CachedObject, RoutesItems, RoutesResponse } from "./common/types";
import FileCache from "./FileCache";

import './common/commons';

class Routes {
    private fileCache: FileCache;

    constructor() {
        this.fileCache = new FileCache();
    }

    getFutureFlightsByIata(iata: string, period = 14): Promise<RoutesItems> {
        const cacheName = `flights_${iata}.json`;

        return this
            .fileCache
            .getCachedItem(cacheName)
            .then((data: CachedObject) => {
                if (data.isValid?.()) {
                    return data.getItem?.();
                }

                return {};
            })
            .then((data => this.collectMissingRecords(data, iata, period)));
    }

    private collectMissingRecords(storedData: RoutesItems, iata: string, period: number): Promise<any> {
        const [todaysDate] = new Date().toISOString().split('T');

        const dates = this.prepareCacheData(storedData, todaysDate, period);

        if (period < 0) {
            return Promise.resolve([]);
        }

        if (dates.length === period) {
            return Promise.resolve(dates.map((date: string) => storedData[date]));
        }

        if (dates.length > 0) {
            return this.fetchMissingRecords(dates[dates.length - 1], period - dates.length, iata)
                        .then(data => dates.map((date: string) => storedData[date]).concat(data));
        }

        if (dates.length === 0) {
            return this.fetchMissingRecords(todaysDate, period, iata);
        }

        return Promise.resolve([]);
    }

    private prepareCacheData(storedData: RoutesItems, todaysDate: string, period: number): Array<string> {
        return Object.keys(storedData)
                    .filter((date: string) => new Date(date) > new Date(todaysDate))
                    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                    .slice(0, period);
    }

    private fetchMissingRecords(startingDate: string, period: number, iata: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const requests =
                [...Array(period).keys()].map((value, index) => {
                    const [_date] = new Date().addDays(index).toISOString().split('T');

                    // flightsFuture returns results since a week after current date
                    // todo determinate how to fetch data for the next 7 days
                    return got('flightsFuture', {
                        searchParams: {
                            type: 'departure',
                            iataCode: iata,
                            date: _date,
                        }
                    }).json();
                })

            Promise.all(requests).then(response => {
                resolve(response);
            }).catch(reject);
        });
    }
}

export default Routes;