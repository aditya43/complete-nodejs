require('./util/helpers');
require('./util/loadEnv');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));

// const test = async () => {
//     const product = await new Product('A Book 1', 120, 'Sample description 1', 'dsadsadsa');
//     await product.save();
// };
// test();
