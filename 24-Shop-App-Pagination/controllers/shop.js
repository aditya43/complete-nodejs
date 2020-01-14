const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

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
    try {
        const page = req.query.page || 1;
        const itemsPerPage = parseInt(process.env.PAGE_ITEMS_PER_PAGE);

        const totalProductsCount = await Product.find().count();

        const products = await Product.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!products) {
            return res.redirect('/404');
        }

        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            totalProducts: totalProductsCount,
            hasNextPage: itemsPerPage * page < totalProductsCount,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalProductsCount / itemsPerPage)
        });
    } catch (e) {
        return next(e);
    }
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

        const order = await Order.findById(orderId);

        if (order.user.userId.toString() === req.user._id.toString()) {
            const invoiceName = `invoice-${orderId}.pdf`;
            const invoicePath = path.join('data', 'invoices', invoiceName);

            // Preloading data
            // const data = await fs.readFile(invoicePath);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', `inline; filename=${invoicename}`);
            // res.send(data);

            // Streaming data
            // const invoiceFile = fs.createReadStream(invoicePath);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', `inline; filename=${invoicename}`);
            // invoiceFile.pipe(res);

            // Generating PDFs using PDFKit
            const pdfDoc = new PDFDocument();
            const fileWriteStream = fs.createWriteStream(invoicePath);

            pdfDoc.pipe(fileWriteStream);
            pdfDoc.pipe(res);

            pdfDoc.fontSize(26).text('Invoice', { underline: true });
            pdfDoc.fontSize(14).text('------------------------------');

            let totalPrice = 0;
            order.products.forEach(product => {
                pdfDoc.text(`${product.product.title} - ${product.quantity} x $${product.product.price}`);

                totalPrice += product.quantity * product.product.price;
            });
            pdfDoc.text('------------------------------');
            pdfDoc.fontSize(20).text(`Total Price: $${totalPrice}`);
            pdfDoc.end();
        }
    } catch (e) {
        return next(e);
    }
};
