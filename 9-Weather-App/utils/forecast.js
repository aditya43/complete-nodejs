/* eslint-disable standard/no-callback-literal */
const request = require('request');

const forecast = (latitude, longitude, location, callback) => {
    const url = `https://api.darksky.net/forecast/b597e671b6449d2353f84da5febd0ce2/${latitude},${longitude}?units=ca`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location, try another search!', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degree celsius at ${location}. There is a ${body.currently.precipProbability}% chance of rain right now.`);
        }
    });
};

module.exports = forecast;
