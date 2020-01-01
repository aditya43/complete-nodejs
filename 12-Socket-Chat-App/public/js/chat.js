const socket = io();

socket.on('countUpdated', count => {
    console.log('The count has been updated to: ', count);
});

document.querySelector('#increment').addEventListener('click', e => {
    console.log('Clicked');
    socket.emit('increment');
});
