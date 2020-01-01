const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../public'))); // Set default path to Static Assets (public directory).

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
