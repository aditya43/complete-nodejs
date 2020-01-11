const path = require('path');

const env = process.env.NODE_ENV || 'dev';

const envFileName = `${env.trim()}.env`;
const envFilePath = path.join(__dirname, `../env/${envFileName}`);

require('dotenv').config({ path: envFilePath });
