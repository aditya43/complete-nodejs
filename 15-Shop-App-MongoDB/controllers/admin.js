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
        const product = await new Product(
            req.body.title,
            req.body.price,
            req.body.description,
            req.body.imageUrl
        );

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
        product: product
    });


    // const products = await req.user.getProducts({
    //     where: {
    //         id: req.params.productId
    //     }
    // });

    // if (!products) {
    //     return res.redirect('/');
    // }

    // res.render('admin/edit-product', {
    //     pageTitle: 'Edit Product',
    //     path: '/admin/edit-product',
    //     editing: editMode,
    //     product: products[0]
    // });
};

// exports.postEditProduct = (req, res, next) => {
//     Product.update({
//         title: req.body.title,
//         price: req.body.price,
//         imageUrl: req.body.imageUrl,
//         description: req.body.description
//     }, {
//         where: { id: req.body.productId },
//         limit: 1
//     })
//         .then(() => {
//             res.redirect('/admin/products');
//         }).catch(e => console.log(e));
// };

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();

    if (!products) {
        res.redirect('/');
    }

    res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
    });
};

// exports.postDeleteProduct = async (req, res, next) => {
//     try {
//         const products = await req.user.getProducts({ id: req.body.productId });

//         if (products) {
//             await products[0].destroy();
//         }

//         res.redirect('/admin/products');
//     } catch (e) {
//         console.log(e);
//     }
// };
