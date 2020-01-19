const jwt = require('jsonwebtoken');
const validator = require('validator');
const models = require('../models/index');

module.exports = {
    createUser: async function (args, req) {
        const { email, name, password } = args.userInput;
        const errors = [];

        if (!validator.isEmail(email)) {
            errors.push({ message: 'Invalid Email-Address' });
        }

        if (validator.isEmpty(password) || !validator.isLength(password, { min: 3 })) {
            errors.push({ message: 'Password too short' });
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input data');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const users = await models.user.findAll({ where: { email } });

        if (users.length && users.length > 0) {
            throw new Error('User already exists');
        }

        const user = await models.user.create({
            email,
            name,
            password
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    },
    login: async function (args, req) {
        const { email, password } = args.userInput;

        const user = await models.user.findByCredentials(email, password);

        if (!user) {
            const error = new Error('User not found');
            error.code = 401;
            throw error;
        }

        const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            token,
            userId: user.id
        };
    }
};
