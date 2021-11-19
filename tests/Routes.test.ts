import Routes from '@src/Routes';
import { mocked } from "ts-jest/utils";
import * as got from '../src/common/gotInstance';

beforeAll(() => {
    const mockedGot = mocked(got);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mockedGot.aviationEdgeGotInstance = jest.fn();

    mockedGot.aviationEdgeGotInstance.mockReturnValue({
        json: () => Promise.resolve({}),
    } as any)
});

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

    test.each([[{}, -1, 0], [{}, 0, 0], [{}, 4, 4], [{'2021-11-12': ''}, 3, 3]])(`It should fetch the missing entries and sum up to period value - %i`, (cachedData, period, length) => {
        return routes['collectMissingRecords'](cachedData, 'GDN', period)
            .then(data => {
                expect(data.length).toBe(length);
            })
    });

    test.each([0, 2, 4, 6, 8, 10, 50, 150, 300])('fetching (%i) records', period => {
		return routes['fetchMissingRecords']('2021-11-19', period, 'GDN')
            .then(data => {
                expect(data.length).toBe(period);
            })
	});

});