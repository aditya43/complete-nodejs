const request = require('request');

const weatherUrl = 'https://api.darksky.net/forecast/b597e671b6449d2353f84da5febd0ce2/37.8267,-122.4233';
const mapLatLongUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Pune%20Koregaon%20Park.json?access_token=pk.eyJ1IjoiYWRpdHlhNDMiLCJhIjoiY2s0anJ2M3o2MXQxZTNscXFyenkzc3IwMCJ9.jY6wENlkRl2TIcZ3SV6XVQ&limit=1';

request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service!');
    }

    if (response.body.code) {
        console.log(`${response.body.code}: ${response.body.error}`);
    }

    if (!error && response.body.daily) {
        const res = response.body;

        console.log(`${res.daily.data[0].summary}. It is currently ${res.currently.temperature} degrees out. There is a ${res.currently.precipProbability}% chance of rain right now.`)
    }
});

request({ url: mapLatLongUrl, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to Mapbox service!');
    }

    if (response.body.features.length === 0) {
        console.log('Unable to find this location. Please try different location!');
    }

    if (!error && response.body.features.length > 0) {
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];

        console.dir(latitude);
        console.dir(longitude);
    }
})