require('./util/helpers');
require('./util/loadEnv');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    // Create user
    const existingUser = await User.findOne();

    if (!existingUser) {
        await new User({
            name: 'Aditya Hajare',
            email: 'aditya@hajare.com',
            cart: {
                items: []
            }
        }).save();
    }
    next();
});

app.use(async (req, res, next) => {
    const user = await User.findById('5e1690e7a365e310a08f0f11');
    req.user = user;
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
