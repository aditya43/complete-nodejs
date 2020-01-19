const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const models = require('../models/index');

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error();
            error.message = errors.array();

            res.status(422).json({
                code: 422,
                status: 'failed',
                message: 'Failed to validate',
                errors: errors.array()
            });

            throw error;
        }

        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const user = await models.user.create({
            email,
            name,
            password
        });

        res.status(201).json({
            code: 201,
            status: 'Success',
            message: 'User created',
            userId: user.id
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await models.user.findByCredentials(email, password);

        if (!user) {
            return res.status(401).json({
                code: 401,
                status: 'failed',
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            code: 201,
            status: 'Success',
            message: 'Login successful',
            token,
            userId: user.id
        });
    } catch (error) {
        next(error);
    }
};
