const request = require('request');

const url = 'https://api.darksky.net/forecast/b597e671b6449d2353f84da5febd0ce2/37.8267,-122.4233';

request({ url: url, json: true }, (error, response) => {
    const res = response.body;

    console.log(`${res.daily.data[0].summary}. It is currently ${res.currently.temperature} degrees out. There is a ${res.currently.precipProbability}% chance of rain right now.`)
});