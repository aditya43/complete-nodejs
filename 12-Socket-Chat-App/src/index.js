const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const events = require('./events/events');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    events.newConnection(socket, io);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
