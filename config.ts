import { APIConfig } from "./src/common/types";

export const API_CONFIG: APIConfig = {
    key: process.env.API_KEY || '',
    url: 'https://aerodatabox.p.rapidapi.com/',
};
