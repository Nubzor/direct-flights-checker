import dontenv from 'dotenv';
import express from 'express';
import { SERVER_CONFIG } from '../config';

import Airports from './Airports';
import Routes from './Routes';

dontenv.config();

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World')
});
  
app.listen(process.env.SERVER_PORT || SERVER_CONFIG.DEFAULT_PORT);



// const polandCenterCords = {
//     lat: 52.196283,
//     lon: 19.356571,
// }

// const airPorts = new Airports(350, 30);
// const routes = new Routes();

// routes.getAirportRoutes('EPGD').then(response => {
//     console.dir(response, { depth: null });
// })

// airPorts
//     .getAirportsByCoorindates(polandCenterCords.lat, polandCenterCords.lon)
//     .then(airports => {
//         console.dir(airports, { depth: null });
//     });
