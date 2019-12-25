const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../public'))); // Static Assets

app.get('/weather', (req, res) => {
    res.send({ // Sending JSON
        forecast: 'It is raining',
        location: 'Koregaon Park, Pune'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
