const express = require('express');
const { check, body } = require('express-validator');
const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);
router.post('/post', feedController.createPost);

module.exports = router;