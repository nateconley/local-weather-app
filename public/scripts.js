if ('geolocation' in navigator) {

	navigator.geolocation.getCurrentPosition(position => {
		getWeatherData(position.coords);
	});
}

function getWeatherData(coords) {
	var lat = coords.latitude;
	var lon = coords.longitude;

	var xhr = new XMLHttpRequest();
	var params = 
		'?lat=' + lat + '&lon=' + lon;

	xhr.open('POST', '/', true);
	xhr.onreadystatechange = function() {
		if(this.status == 200 && this.readyState == 4) {
			console.log(this.responseText);
		} else if (this.readyState === 4) {
			console.log(this.responseText);
		}
	}
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		lat: lat,
		lon: lon,
	}));
}