const path = require('path');
const express = require('express');

const router = express.Router();
const rootDir = require('../utils/path');

router.get('/add-product', (request, response, next) => {
    response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (request, response, next) => {
    console.log(request.body);
    response.redirect('/');
});

module.exports = router;
