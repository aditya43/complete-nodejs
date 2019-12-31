const sharp = require('sharp');
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
        parameters.forEach((param) => {
            req.user[param] = req.body[param];
        });

        await req.user.save();

        return res.status(200).send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.delete = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send(req.user);
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

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
};

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
};

exports.setAvatar = async (req, res, next) => {
    if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return res.status(400).send({ error: 'Please upload image file. Supported extensions: .jpg, .jpeg, .png' });
    }

    const buffer = await sharp(req.file.buffer)
        .resize({width: 250, height: 250})
        .png()
        .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
};

exports.deleteAvatar = async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
};

exports.getAvatar = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error('Avatar image not found!');
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send(error)
    }
}