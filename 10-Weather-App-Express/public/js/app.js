console.log('Client side javascript is loaded');

if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('#message-1').textContent = 'Loading...';
        document.querySelector('#message-2').textContent = '';

        const location = document.querySelector('input').value;

        fetch(`/weather?address=${location}`)
            .then(res => {
                res.json().then(data => {
                    if (data.error) {
                        document.querySelector('#message-1').textContent = data.error;
                    } else {
                        document.querySelector('#message-1').textContent = data.location;
                        document.querySelector('#message-2').textContent = data.forecast;
                    }
                });
            })
            .catch(err => {
                console.log(err);
            });
    });
}
