import { aviationEdgeGotInstance as got } from "./common/gotInstance";
import { CachedObject, RoutesResponse } from "./common/types";
import FileCache from "./FileCache";


// consider moving this two somewhere else
declare global {
    interface Date {
        addDays (days?: number) : Date;
    }
}

Date.prototype.addDays = function(days: number) {
    const date = new Date(this.valueOf());

    date.setDate(date.getDate() + days);

    return date;
}

class Routes {
    private fileCache: FileCache;

    constructor() {
        this.fileCache = new FileCache();
    }

    getFutureFlightsByIata(iata: string, period = 14): Promise<any> {
        const cacheName = `flights_${iata}.json`;
        const [todaysDate] = new Date().toISOString().split('T');

        return this
            .fileCache
            .getCachedItem(cacheName)
            .then((data: CachedObject) => {
                if (data.isValid?.()) {
                    return data.getItem?.();
                }

                return {};
            })
            .then((storedData: any) => {
                const dates = this.prepareCacheData(storedData, todaysDate, period);

                if (dates.length === period) {
                    return dates.map(date => storedData(date));
                }

                if (dates.length > 0) {
                    return dates.map(date => storedData(date))
                            .concat(this.fetchMissingRecords(dates[dates.length - 1], period - dates.length, iata));
                }

                if (dates.length === 0) {
                    return this.fetchMissingRecords(todaysDate, period, iata);
                }
            });
    }

    private prepareCacheData(storedData: any, todaysDate: string, period: number): any {
        return Object.keys(storedData)
                    .filter(date => new Date(date) > new Date(todaysDate))
                    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                    .slice(0, period);
    }

    private fetchMissingRecords(startingDate: string, period: number, iata: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const requests =
                [...Array(period).keys()].map((value, index) => {
                    const [_date] = new Date().addDays(index).toISOString().split('T');

                    console.log(_date);

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
                console.log(response);
            });
        });
    }
}

export default Routes;