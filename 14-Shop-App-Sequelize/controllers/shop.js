const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    }).catch(e => console.log(e));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findOne({ id: prodId })
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(e => console.log(e));
};

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    }).catch(e => console.log(e));
};

exports.getCart = async (req, res, next) => {
    const cart = await req.user.getCart();

    if (!cart) {
        res.redirect('/');
    }

    const products = await cart.getProducts();

    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
    });
};

exports.postCart = async (req, res, next) => {
    let newQuantity = 1;
    const cart = await req.user.getCart();

    const products = await cart.getProducts({ where: { id: req.body.productId } });

    if (products.length > 0) {
        res.redirect('/');
    }

    const product = await Product.findOne({ id: req.body.productId });

    if (product) {
        const oldQuantity = products[0].cartItem.quantity;
        newQuantity = oldQuantity + 1;
    }

    await cart.addProduct(product, {
        through: {
            quantity: newQuantity
        }
    });

    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
