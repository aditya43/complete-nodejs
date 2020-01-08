const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
    });
};

exports.getProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
        return res.redirect('/404');
    }

    res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
    });
};

exports.getIndex = async (req, res, next) => {
    const products = await Product.fetchAll();

    if (!products) {
        return res.redirect('/404');
    }

    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
    });
};

exports.getCart = async (req, res, next) => {
    const products = await req.user.getCart();

    if (!products) {
        res.redirect('/');
    }

    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
    });
};

exports.postCart = async (req, res, next) => {
    const product = await Product.findById(req.body.productId);
    await req.user.addToCart(product);

    res.redirect('/cart');
};

exports.postCartDeleteProduct = async (req, res, next) => {
    await req.user.deleteItemFromCart(req.body.productId);

    res.redirect('/cart');
};

exports.postOrder = async (req, res, next) => {
    await req.user.addOrder();

    res.redirect('/orders');
};

exports.getOrders = async (req, res, next) => {
    const orders = await req.user.getOrders({ include: ['products'] });

    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
    });
};
