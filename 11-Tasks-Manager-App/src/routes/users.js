const express = require('express');
const userController = require('../controllers/user');

const router = new express.Router();

router.post('/users', userController.add);
router.get('/users', userController.get);
router.get('/users/:id', userController.find);
router.patch('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;
