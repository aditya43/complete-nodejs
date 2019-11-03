const http = require('http');
const express = require('express');

const app = express();

app.use((request, response, next) => {
    console.log('First middleware');
    next();
});

app.use((request, response, next) => {
    response.send('Hello World!');
});

const server = http.createServer(app);

server.listen(3000);
