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
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Aditya Hajare',
            email: 'aditya.hajare@example.com',
            password: 'aditya123!'
        })
        .expect(201);

    // Assert that the database was changed correctly.
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertion about the response.
    expect(response.body).toMatchObject({
        user: {
            name: 'Aditya Hajare',
            email: 'aditya.hajare@example.com'
        }
    });

    // Assert that the plain text password is not stored in database.
    expect(user.password).not.toBe('aditya123!');
});

test('should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    // Assert that the JWT Token stored in database is same as the one received in post login response.
    const user = await User.findById(response.body.user._id);
    expect(response.body.jwtToken).toBe(user.tokens[1].token);
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

test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // Assert that the user is deleted from database.
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('should not delete account for the unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);

    // Assert that the avatar data stored in database is of type Buffer.
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'John Doe'
        })
        .expect(200);
});
