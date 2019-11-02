const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>
        <head>
            <title>Node JS Server</title>
        </head>
        <body>
            <h1>Hello World!</h1>
        </body>
    </html>`);
    res.end();
});

server.listen(3000);
