const { validationResult } = require('express-validator');
const { user } = require('../models/index');

exports.signup = (req, res, next) => {
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
    } catch (error) {
        next(error);
    }
};
