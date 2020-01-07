const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
    });
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
    let product = false;
    const cart = await req.user.getCart();

    const products = await cart.getProducts({ where: { id: req.body.productId } });
    if (products.length > 0) {
        product = products[0];
        const oldQuantity = products[0].cartItem.quantity;
        newQuantity = oldQuantity + 1;
    }

    if (!product) {
        product = await Product.findOne({ where: { id: req.body.productId } });
    }

    await cart.addProduct(product, {
        through: {
            quantity: newQuantity
        }
    });

    res.redirect('/cart');
};

exports.postCartDeleteProduct = async (req, res, next) => {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: req.body.productId } });

    await products[0].cartItem.destroy(); ;
    res.redirect('/cart');
};

exports.postOrder = async (req, res, next) => {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder({ include: ['products'] });

    await order.addProducts(await products.map(async product => {
        product.orderItem = { quantity: await product.cartItem.quantity };
        return product;
    }));

    await cart.setProducts(null);

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
