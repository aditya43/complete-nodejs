const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const { email, password, name } = require('../middleware/validations');

router.put('/signup', [email, password, name], authController.signup);
router.post('/login', authController.login);

module.exports = router;
