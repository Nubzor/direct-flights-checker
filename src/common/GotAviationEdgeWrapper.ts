import got, { Got } from 'got';

import { APIConfig } from './types';

class GotAviationEdgeWrapper {
    private readonly instance: Got;

    constructor(config: APIConfig) {    
        this.instance = got.extend({
            prefixUrl: config.url,
        });
    }

    getInstance(): Got {
        return this.instance;
    }
}

export default GotAviationEdgeWrapper;