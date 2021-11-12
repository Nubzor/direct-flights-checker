import dontenv from 'dotenv';
import Airports from './Airports';

dontenv.config();

const polandCenterCords = {
    lat: 52.196283,
    lon: 19.356571,
}

const airPorts = new Airports(350, 30);

// airPorts.getAirportsByCoorindates(polandCenterCords.lat, polandCenterCords.lon);