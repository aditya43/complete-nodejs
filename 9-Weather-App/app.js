const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
    console.log('Please provide an address');
} else {
    geocode('Pune Koregaon Park', (error, data) => {
        if (error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, msg) => {
            if (error) {
                return console.log(error);
            }

            console.log(msg);
        });
    });
}
