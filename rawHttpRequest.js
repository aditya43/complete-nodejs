var https = require('https');

const url = `https://api.darksky.net/forecast/b597e671b6449d2353f84da5febd0ce2/40,-75?units=ca`;

const req = https.request(url, res => {
    let data;

    res.on('data', chunk => {
        // Chunk = Buffer data.
        data += chunk.toString(); // Convert chunk buffer data to string and keep on attaching to 'data' variable.
    });

    res.on('end', () => {
        // Fired when all chunks are received.
        // Now 'data' variable has readable data.
        // console.log(data); // 'data' variable has JSON string.
        const body = JSON.parse(data);
        console.log(body);
    });
});

req.on('error', error => {
    // Error handling is done here. Outside 'https.request'.
    console.log(error);
});

req.end(); // Request won't be fired without this line indeed.
