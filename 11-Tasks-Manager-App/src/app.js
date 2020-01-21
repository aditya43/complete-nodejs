require('./config/loadEnv');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const morganLogger = require('./middleware/morganLogger');
const checkMaintainanceMode = require('./middleware/checkMaintainanceMode');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(helmet());
app.use(compression());
app.use(morganLogger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(checkMaintainanceMode); // Middleware
app.use(userRoutes);
app.use(taskRoutes);

module.exports = app;
