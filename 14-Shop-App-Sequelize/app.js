require('./util/helpers');
require('./util/loadEnv');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    const user = await User.findOne({ id: 1 });
    req.user = user;
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
    // .sync({ force: true })
    .sync()
    .then(async res => {
        let user = await User.findOne({ id: 1 });

        if (!user) {
            user = User.create({
                name: 'Aditya Hajare',
                email: 'aditya@hajare.com'
            });
        }

        user.createCart();
        app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
    })
    .catch(e => {
        console.log(e);
    });
