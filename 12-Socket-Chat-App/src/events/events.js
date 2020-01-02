const Filter = require('bad-words');
const { generateMessage } = require('../utils/messages');

exports.newConnection = (socket, io) => {
    console.log('New websocket connection');
    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Bad word detected!');
        }

        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', `https://www.google.com/maps?q=${coords.latitude}${coords.longitude}`);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });
};
