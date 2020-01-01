const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Aditya Hajare',
    email: 'aditya@hajare.com',
    password: '1337wtf!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

const populateDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
};

module.exports = {
    userOneId,
    userOne,
    populateDatabase
};
