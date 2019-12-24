const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// const weatherUrl = 'https://api.darksky.net/forecast/b597e671b6449d2353f84da5febd0ce2/37.8267,-122.4233';

// request({ url: weatherUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!');
//     }

//     if (response.body.code) {
//         console.log(`${response.body.code}: ${response.body.error}`);
//     }

//     if (!error && response.body.daily) {
//         const res = response.body;

//         console.log(`${res.daily.data[0].summary}. It is currently ${res.currently.temperature} degrees out. There is a ${res.currently.precipProbability}% chance of rain right now.`);
//     }
// });

geocode('Pune Koregaon Park', (error, data) => {
    // console.log(error);
    // console.log(data);
    if (!error) {
        forecast(data.latitude, data.longitude, (msg) => {
            console.log(msg);
        });
    }
});
