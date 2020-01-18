const express = require('express');
const { title, content } = require('../middleware/validations');
const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);
router.post('/post', [title, content], feedController.createPost);
router.get('/post/:postId', feedController.getPost);
router.put('/post/:postId', [title, content], feedController.updatePost);
router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
