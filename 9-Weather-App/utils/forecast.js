/* eslint-disable standard/no-callback-literal */
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/b597e671b6449d2353f84da5febd0ce2/${latitude},${longitude}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location, try another search!', undefined);
        } else {
            callback(undefined, `${response.body.daily.data[0].summary}. It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain right now.`);
        }
    });
};

module.exports = forecast;
