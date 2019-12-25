var express = require('express');

const app = express();

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>'); // Sending HTML
});

app.get('/weather', (req, res) => {
    res.send({ // Sending JSON
        forecast: 'It is raining',
        location: 'Koregaon Park, Pune'
    });
});

app.get('/help', (req, res) => {
    res.send([ // Sending array, still be sent as JSON.
        'Aditya',
        'Nishigandha'
    ]);
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
