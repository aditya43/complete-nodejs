const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
    console.log('Please provide an address');
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        // 'latitude', 'longitude' and 'location' - Using object destructuring.
        if (error) {
            return console.log(error);
        }

        forecast(latitude, longitude, location, (error, msg) => {
            if (error) {
                return console.log(error);
            }

            console.log(msg);
        });
    });
}
