exports.newConnection = (socket, io) => {
    console.log('New websocket connection');
    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', message => {
        io.emit('message', message);
    });

    socket.on('sendLocation', coords => {
        io.emit('message', `https://www.google.com/maps?q=${coords.latitude}${coords.longitude}`);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    });
};
