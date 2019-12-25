console.log('Client side javascript is loaded');

if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const location = document.querySelector('input').value;

        fetch(`http://localhost:3000/weather?address=${location}`)
            .then(res => {
                res.json().then(data => {
                    console.log(data);
                });
            })
            .catch(err => {
                console.log(err);
            });
    });
}
