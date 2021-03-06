const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.session.isAuthenticated
    });
};

exports.postAddProduct = async (req, res, next) => {
    try {
        const product = await new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: req.user
        });

        await product.save();

        res.redirect('/admin/products');
    } catch (e) {
        console.log(e);
    }
};

exports.getEditProduct = async (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const product = await Product.findById(req.params.productId);

    if (!product) {
        return res.redirect('/404');
    }

    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isAuthenticated
    });
};

exports.postEditProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.productId);

        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.imageUrl = req.body.imageUrl;
        product.productId = req.body.productId;

        await product.save();
        res.redirect('/admin/products');
    } catch (e) {
        console.log(e);
    }
};

exports.getProducts = async (req, res, next) => {
    // Method 1
    const products = await Product.find().populate('userId');

    // Method 2 - To retrieve specific fields only (SELECT).
    // const products = await Product.find()
    //     .select('title price -_id')
    //     .populate('userId', 'name');

    // res.send(products);

    if (!products) {
        res.redirect('/');
    }

    res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isAuthenticated
    });
};

exports.postDeleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.body.productId);
        res.redirect('/admin/products');
    } catch (e) {
        console.log(e);
    }
};
