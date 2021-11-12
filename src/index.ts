import dontenv from 'dotenv';
import Airports from './Airports';
import Routes from './Routes';

dontenv.config();

const polandCenterCords = {
    lat: 52.196283,
    lon: 19.356571,
}

const airPorts = new Airports(350, 30);
const routes = new Routes();

routes.getAirportRoutes('EPGD').then(response => {
    console.dir(response, { depth: null });
})

// airPorts
//     .getAirportsByCoorindates(polandCenterCords.lat, polandCenterCords.lon)
//     .then(airports => {
//         console.dir(airports, { depth: null });
//     });
