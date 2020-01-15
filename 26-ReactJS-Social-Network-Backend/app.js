require('./utils/loadEnv');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(function(req, res, next) {
//     // CORS Middleware
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
//     next();
// })

app.use('/feed', feedRoutes);

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));