const jwt = require('jsonwebtoken');
const models = require('../models/index');

module.exports = {
    createUser: async function (args, req) {
        const { email, name, password } = args.userInput;

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
    }
};
