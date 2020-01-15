require('./utils/loadEnv');

const express = require('express');

const feedRoutes = require('./routes/feed');

const app = express();

app.use('/feed', feedRoutes);

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));