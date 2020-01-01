const request = require('supertest');
const app = require('../src/app');

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Aditya Hajare',
        email: 'aditya.hajare@jetsynthesys.com',
        password: 'aditya123!'
    }).expect(201);
});
