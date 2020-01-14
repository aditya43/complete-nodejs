require('./util/helpers');
require('./util/loadEnv');

const logger = require('./util/errorLogger');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectMongoDBSession = require('connect-mongodb-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_CONNECTION_STRING,
    collection: 'sessions'
});
const multerFileFilter = (req, file, cb) => {
    if (
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
    dest: 'images',
    limits: { fileSize: 1000000 },
    fileFilter: multerFileFilter
}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrf());
app.use(flash());

app.use(async (req, res, next) => {
    try {
        if (req.session.user) {
            const user = await User.findById(req.session.user._id);

            if (user) {
                req.user = user;
                return next();
            }
        }
        next();
    } catch (e) {
        return next(e); // This will skip all other middlewares and move on error handling middleware.
    }
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// Error handling middleware.
app.use(async (error, req, res, next) => {
    // Express automatically knows when middleware has 4 arguments, it's an error handling middleware.
    // If you have more than one error handling middlewares, they will be executed from top to bottom. Just like normal middlewares.
    logger.error({
        message: error.message,
        error: error,
        stack: error.stack
    });
    res.status(500).render('500', {
        pageTitle: '500 | Something went wrong',
        path: '/500',
        isAuthenticated: req.session.isAuthenticated,
        csrfToken: req.csrfToken()
    });
});

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
