const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

const { userOneId, userOne, populateDatabase } = require('./fixtures/db');

beforeEach(populateDatabase);

test('should create task for user', () => {

});
