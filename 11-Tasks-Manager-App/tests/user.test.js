const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'Aditya Hajare',
    email: 'aditya@hajare.com',
    password: '1337wtf!!'
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Aditya Hajare',
        email: 'aditya.hajare@example.com',
        password: 'aditya123!'
    }).expect(201);
});

test('should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'user@example.com',
        password: 'user123'
    }).expect(400);
});
