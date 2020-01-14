const fs = require('fs');
const path = require('path');

const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
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
    const products = await Product.find();

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
    const userCart = await req.user.populate('cart.items.productId').execPopulate();

    if (!userCart.cart.items) {
        res.redirect('/');
    }

    const products = userCart.cart.items;

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
    await req.user.removeFromCart(req.body.productId);

    res.redirect('/cart');
};

exports.postOrder = async (req, res, next) => {
    const userCart = await req.user.populate('cart.items.productId').execPopulate();

    if (!userCart.cart.items) {
        res.redirect('/');
    }

    const products = userCart.cart.items.map(item => {
        return {
            product: { ...item.productId._doc },
            quantity: item.quantity
        };
    });

    const order = new Order({
        user: {
            email: req.user.email,
            userId: req.user
        },
        products
    });

    await order.save();
    await req.user.clearCart();

    res.redirect('/orders');
};

exports.getOrders = async (req, res, next) => {
    const orders = await Order.find({ 'user.userId': req.user._id });
    // res.send(orders);
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
    });
};

exports.getInvoice = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const invoiceName = `invoice-${orderId}.pdf`;

        const invoicePath = path.join('data', 'invoices', invoiceName);
        const data = await fs.readFile(invoicePath);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=${invoicename}`);

        res.send(data);
    } catch (e) {
        return next(e);
    }
};
