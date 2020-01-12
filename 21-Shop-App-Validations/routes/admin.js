const express = require('express');
const adminController = require('../controllers/admin');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
