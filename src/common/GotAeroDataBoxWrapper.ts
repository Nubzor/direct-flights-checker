import got, { Got } from 'got';

import { APIConfig } from './types';

class GotAeroDataBoxWrapper {
    private readonly instance: Got;

    constructor(config: APIConfig) {    
        this.instance = got.extend({
            prefixUrl: config.url,
            headers: {
                'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
                'x-rapidapi-key': config.key,
            },
        });
    }

    getInstance(): Got {
        return this.instance;
    }
}

export default GotAeroDataBoxWrapper;