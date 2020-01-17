require('./utils/loadEnv');

const logger = require('./utils/errorLogger');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    logger.error({
        message: error.message,
        error: error
    });
    res.status(500).json({
        code: 500,
        message: 'Something went wrong!'
    });
});

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
