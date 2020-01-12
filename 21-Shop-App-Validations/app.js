require('./util/helpers');
require('./util/loadEnv');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectMongoDBSession = require('connect-mongodb-session');
const csrf = require('csurf');
const flash = require('connect-flash');

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_CONNECTION_STRING,
    collection: 'sessions'
});

const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrf());
app.use(flash());

app.use(async (req, res, next) => {
    if (req.session.user) {
        req.user = await User.findById(req.session.user._id);
    }
    next();
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

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
