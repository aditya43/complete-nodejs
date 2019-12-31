const path = require('path');

const envFileName = `${process.env.NODE_ENV.trim()}.env`;

const envFilePath = path.join(__dirname, `../../env/${envFileName}`);

require('dotenv').config({ path: envFilePath });
