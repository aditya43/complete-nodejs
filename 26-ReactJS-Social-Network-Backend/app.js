require('./utils/loadEnv');

// Middlewares
const errorLogger = require('./middleware/errorLogger');
const multer = require('./middleware/multer');

// Express config
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

// Route
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use(multer);

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use(errorLogger);

// Boot up
app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
