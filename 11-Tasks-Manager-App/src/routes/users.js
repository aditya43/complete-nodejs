const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.post('/users', userController.add);
router.get('/users/me', authMiddleware, userController.get);
router.get('/users/:id', userController.find);
router.patch('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);
router.post('/users/login', userController.login);
router.post('/users/logout', authMiddleware, userController.logout);
router.post('/users/logoutAll', authMiddleware, userController.logoutAll);

module.exports = router;
