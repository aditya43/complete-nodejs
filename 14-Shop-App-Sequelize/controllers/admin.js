const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = async (req, res, next) => {
    try {
        // 'createProduct' is a magic association method.
        await req.user.createProduct({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl
        });

        res.redirect('/admin/products');
    } catch (e) {
        console.log(e);
    }
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findOne({ id: prodId })
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        }).catch(e => console.log(e));
};

exports.postEditProduct = (req, res, next) => {
    Product.update({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }, {
        where: { id: req.body.productId },
        limit: 1
    })
        .then(() => {
            res.redirect('/admin/products');
        }).catch(e => console.log(e));
};

exports.getProducts = (req, res, next) => {
    Product.findAll({ limit: 50 })
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(e => console.log(e));
};

exports.postDeleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({ id: req.body.productId });

        if (product) {
            await product.destroy();
        }

        res.redirect('/admin/products');
    } catch (e) {
        console.log(e);
    }
};
