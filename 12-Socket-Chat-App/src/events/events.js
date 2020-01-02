const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('../utils/messages');

exports.newConnection = (socket, io) => {
    console.log('New websocket connection');

    socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`));
    });

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Bad word detected!');
        }

        io.to().emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://www.google.com/maps?q=${coords.latitude}${coords.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });
};
