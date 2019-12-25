const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs'); // Set templating engine.

app.use(express.static(path.join(__dirname, '../public'))); // Set default path to Static Assets (public directory).
app.set('views', path.join(__dirname, '../templates/views')); // Set default path for views.
hbs.registerPartials(path.join(__dirname, '../templates/partials')); // Set default path for views partials.

app.get('/weather', (req, res) => {
    res.send({ // Sending JSON.
        forecast: 'It is raining',
        location: 'Koregaon Park, Pune'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'Weather App About Page',
        name: 'Aditya Hajare'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        pageTitle: 'Help Page',
        message: 'This is a sample help message',
        name: 'Aditya Hajare'
    });
});

app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Weather App',
        name: 'Aditya Hajare'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
