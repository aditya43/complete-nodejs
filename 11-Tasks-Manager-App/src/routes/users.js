const express = require('express');
const avatarConfig = require('../controllers/avatar');
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.post('/users', userController.add);
router.get('/users/me', authMiddleware, userController.get);
router.get('/users/:id', userController.find);
router.patch('/users/me', authMiddleware, userController.update);
router.delete('/users/me', authMiddleware, userController.delete);
router.post('/users/login', userController.login);
router.post('/users/logout', authMiddleware, userController.logout);
router.post('/users/logoutAll', authMiddleware, userController.logoutAll);
router.post('/users/me/avatar', [authMiddleware, avatarConfig], userController.setAvatar);
router.delete('/users/me/avatar', authMiddleware, userController.deleteAvatar);

module.exports = router;
