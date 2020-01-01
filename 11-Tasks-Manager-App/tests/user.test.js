const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

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

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('should not allow password to contain word password', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Aditya Hajare',
            email: 'aditya.hajare@example.com',
            password: 'mypassword'
        })
        .expect(400);
});

test('should signup a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Aditya Hajare',
            email: 'aditya.hajare@example.com',
            password: 'aditya123!'
        })
        .expect(201);
});

test('should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);
});

test('should not login nonexistent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'user@example.com',
            password: 'user123'
        })
        .expect(400);
});

test('should get profile for the logged in user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('should not get profile for the unauthenticated request', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});