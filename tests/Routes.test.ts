import Routes from '@src/Routes';

describe("A Routes class tests", () => {
    const routes: Routes = new Routes();

    const cachedData = {
        '2021-11-15': {},
        '2021-11-18': {},
        '2021-11-17': {},
        '2021-11-16': {},
        '2021-11-19': {},
    }

    test('If cached data is properly sorted and tailored', () => {
        expect(routes['prepareCacheData'](cachedData, '2021-11-14', 3))
            .toEqual(['2021-11-15', '2021-11-16', '2021-11-17']);
    });

    test('If cached data is properly sorted and tailored if todaysdate is from the past', () => {
        expect(routes['prepareCacheData'](cachedData, '2021-10-14', 3))
            .toEqual(['2021-11-15', '2021-11-16', '2021-11-17']);
    });

    test('If cached data is properly sorted and tailored if todaysdate is from the future', () => {
        expect(routes['prepareCacheData'](cachedData, '2021-12-14', 3))
            .toEqual([]);
    });

    test('If cached data is properly sorted and tailored if period is equal to 0', () => {
        expect(routes['prepareCacheData'](cachedData, '2021-11-14', 0))
            .toEqual([]);
    });

    test('If cached data is properly sorted and tailored if period is negative', () => {
        expect(routes['prepareCacheData'](cachedData, '2021-11-14', -5))
            .toEqual([]);
    });
});