const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').load();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
	console.log('hello');
});

app.post('/', (req, res) => {
	console.log(req.params);
	getWeatherData(req.body, res);
});

app.listen(port, () => {
	console.log(`Front end server running on port ${port}...`);
});

function getWeatherData(location, res) {

	const appid = process.env.APP_ID;

	const url = 
		`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&APPID=${appid}`;

	const weather = {};

	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			weather.city = `${data.name}, ${data.sys.country}`;
			weather.tempF = Math.round(data.main.temp);
			weather.tempC = Math.round((data.main.temp - 32) * (5/9));
			weather.description = data.weather[0].description;
			weather.iconURL = 
				`https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
			weather.wind = {
				speed : `${Math.round(data.wind.speed)} mph`,
				degrees : data.wind.deg,
			}

			res.json(weather);
		} else {
			const data = JSON.parse(body);
			res.status(500).send({error: data.message});
		}

		
	});
}
