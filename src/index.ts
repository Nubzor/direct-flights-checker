import dontenv from 'dotenv';
import got, { Got } from 'got';

dontenv.config();

interface APIConfig {
    id: string;
    key: string;
    url: string;
}

const API_CONFIG: APIConfig = {
    id: process.env.API_ID || '',
    key: process.env.API_KEY || '',
    url: 'https://api.flightstats.com/flex/airports/rest',
}

enum API_PATHS {
    AIRPORTS = 'v1/json/active',  
}

class GotWrapper {
    private readonly instance: Got;

    constructor(config: APIConfig) {    
        this.instance = got.extend({
            prefixUrl: config.url,
            searchParams: {
                appId: config.id,
                appKey: config.key,
            }
        });
    }

    getInstance(): Got {
        return this.instance;
    }
}

const gotInstance: Got = new GotWrapper(API_CONFIG).getInstance();

gotInstance(API_PATHS.AIRPORTS)
    .then(res => console.log(res.body));
