const { body } = require('express-validator');

exports.title = body('title').trim()
    .isLength({ min: 5 });

exports.content = body('content').trim()
    .isLength({ min: 5 });
