require('./utils/loadEnv');

// Middlewares
const errorLogger = require('./middleware/errorLogger');
const multer = require('./middleware/multer');
const checkAuth = require('./middleware/checkAuthentication');

// Express config
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// GraphQL
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.options('*', cors());
app.use(cors());
app.use(multer);

app.use(checkAuth); // Check authentication.

app.put('/post-image', async (req, res, next) => {
    if (!req.isAuth) {
        throw new Error('Not authenticated');
    }

    if (!req.file) {
        return res.status(200).json({ message: 'No file provided' });
    }

    if (req.body.oldPath) {
        clearImage(req.body.oldPath);
    }

    return res.status(201).json({
        message: 'File uploaded',
        filePath: req.file.path
    });
});

// GraphQL
app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError: err => {
        if (!err.originalError) {
            return err;
        }

        const data = err.originalError.data || [];
        const status = err.message || 'Something went wrong';
        const code = err.originalError.code || 500;

        return { data, status, code };
    }
}));

app.use(errorLogger);

// Boot up
app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};
