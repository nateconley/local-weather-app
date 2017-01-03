const express = require('express');
const request = require('request');
const app = express();
require('dotenv').load();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('hello world');
});

app.post('/', (req, res) => {
	getWeatherData(req.body, res);
});

app.listen(3000, () => {
	console.log('Front end server running on port 3000...');
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
		} else {
			const data = JSON.parse(body);
			weather.error = true;
			weather.msg = data.message;
		}

		// res.json(weather);
	});
}

getWeatherData(34.0522, -118.2437);
