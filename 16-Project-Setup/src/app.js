import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import mongoose from'mongoose';
// import jwt from'jsonwebtoken';

// import User from './models/user';
// import Item from './models/item';

import config from 'config';
import routes from './routes';
// import db from './db/db';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log(`Server is running on port ${port}.`);

module.exports = app;
