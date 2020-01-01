exports.newConnection = (socket, io) => {
    console.log('New websocket connection');
    socket.emit('message', 'Welcome!');

    socket.on('sendMessage', message => {
        io.emit('message', message);
    });
};
