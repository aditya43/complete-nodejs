const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public'))); // Set default path to Static Assets (public directory).

io.on('connection', () => {
    console.log('New websocket connection');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
