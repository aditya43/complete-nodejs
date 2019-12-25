const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs'); // Set templating engine.

app.use(express.static(path.join(__dirname, '../public'))); // Set default path to Static Assets (public directory).
app.set('views', path.join(__dirname, '../templates/views')); // Set default path for views.
hbs.registerPartials(path.join(__dirname, '../templates/partials')); // Set default path for views partials.

app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Weather App',
        name: 'Aditya Hajare'
    });
});

app.get('/weather', (req, res) => {
    res.send({ // Sending JSON.
        forecast: 'It is raining',
        location: 'Koregaon Park, Pune'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
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

app.get('/help/*', (req, res) => {
    // To handle help specific 404 pages using Express wildcard '*'.
    res.render('404', {
        errorMsg: 'Help article not found',
        pageTitle: 'Help Page',
        name: 'Aditya Hajare'
    });
});

app.get('*', (req, res) => {
    // Express provides wildcard character '*' to match everything that hasn't been matched so far.
    // This is useful for 404.
    res.render('404', {
        errorMsg: '404 Page Not Found!',
        pageTitle: '404 - Page Not Found',
        name: 'Aditya Hajare'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
