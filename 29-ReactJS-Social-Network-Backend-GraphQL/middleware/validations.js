const { body } = require('express-validator');
const { user } = require('../models/index');

exports.title = body('title').trim()
    .isLength({ min: 5 });

exports.content = body('content').trim()
    .isLength({ min: 5 });

exports.email = body('email').isEmail()
    .withMessage('Please enter valid email address')
    .custom(async (value, { req }) => {
        const users = await user.findAll({ where: { email: value } });

        if (users.length && users.length > 0) {
            return Promise.reject(new Error('Email-address already exists!'));
        }
    })
    .normalizeEmail();

exports.password = body('password').trim()
    .isLength({ min: 5 });

exports.name = body('name').not()
    .isEmpty();
