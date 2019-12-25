console.log('Client side javascript is loaded');

fetch('http://puzzle.mead.io/puzzle')
    .then(res => {
        res.json().then(data => {
            console.dir(data);
        });
    })
    .catch(err => {
        console.dir(err);
    });
