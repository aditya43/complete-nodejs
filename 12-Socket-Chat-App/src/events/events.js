const Filter = require('bad-words');

exports.newConnection = (socket, io) => {
    console.log('New websocket connection');
    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Bad word detected!');
        }

        io.emit('message', message);
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `https://www.google.com/maps?q=${coords.latitude}${coords.longitude}`);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    });
};
