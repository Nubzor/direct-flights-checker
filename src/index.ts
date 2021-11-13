import dontenv from 'dotenv';
import express from 'express';
import ejs from 'ejs';
import path from 'path';

import { SERVER_CONFIG } from '../config';

import Airports from './Airports';
import Routes from './Routes';

dontenv.config();

const app = express();

app.set("views", path.join( __dirname, "views" ));
app.engine('html', ejs.renderFile);

app.use('/static', express.static(path.join(__dirname, '..', 'views', 'statics')));

const polandCenterCords = {
	lat: 52.196283,
	lon: 19.356571,
}

const airPorts = new Airports(350, 30);
const routes = new Routes();

const buildViewFilePath = (fileName: string): string => {
	return path.join(__dirname, '..', 'views', fileName);
}

app.get('/', (req, res) => {
	airPorts
	.getAirportsByCoorindates(polandCenterCords.lat, polandCenterCords.lon)
	.then(airports => {
		res.render(buildViewFilePath('index.html'), {
			airports: JSON.stringify(airports),
		});
	});
});

app.get('/routes/:icao', (req, res) => {
	const icao = req.params.icao;

	routes.getAirportRoutes(icao).then(response => {
		res.send(response);
	})
});

app.get('*', (req, res) => {
	res.redirect('/');
});
  
app.listen(process.env.SERVER_PORT || SERVER_CONFIG.DEFAULT_PORT);
