const express = require('express');
const { title, content } = require('../middleware/validations');
const checkAuthentication = require('../middleware/checkAuthentication');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', [checkAuthentication], feedController.getPosts);
router.post('/post', [checkAuthentication, title, content], feedController.createPost);
router.get('/post/:postId', [checkAuthentication], feedController.getPost);
router.put('/post/:postId', [checkAuthentication, title, content], feedController.updatePost);
router.delete('/post/:postId', [checkAuthentication], feedController.deletePost);
router.get('/test', [checkAuthentication], feedController.test);

module.exports = router;
