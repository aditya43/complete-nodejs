const socket = io();

socket.on('message', message => {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', e => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, error => {
        if (error) {
            console.log('Bad word detected!');
        }

        console.log('Message delivered!');
    });
});

document.querySelector('#send-location').addEventListener('click', e => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!');
    }

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!');
        });
    });
});
