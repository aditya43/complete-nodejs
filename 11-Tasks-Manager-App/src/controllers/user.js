require('../db/mongoose'); // Database connection

const User = require('../models/user');

exports.add = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const jwtToken = await user.generateJwtAuthToken();

        res.status(201).send({ user, jwtToken });
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.get = async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.find = async (req, res) => {
    try {
        const _id = req.params.id;

        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send({});
        }

        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.update = async (req, res) => {
    const parameters = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isParamAllowedToUpdated = parameters.every(param => allowedUpdates.includes(param));

    if (!isParamAllowedToUpdated) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        // If we use findByIdAndUpdate(), Mongoose middleware won't be executed.
        const _id = req.params.id;
        const user = await User.findById(_id);

        parameters.forEach((param) => {
            user[param] = req.body[param];
        });

        await user.save();

        if (!user) {
            return res.status(404).send({ error: 'User not found!' });
        }

        return res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.delete = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            res.status(400).send({ error: 'User not found!' });
        }

        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const jwtToken = await user.generateJwtAuthToken();

        res.status(200).send({ user, jwtToken });
    } catch (e) {
        res.status(400).send({ error: 'Invalid credentials' });
    }
};
