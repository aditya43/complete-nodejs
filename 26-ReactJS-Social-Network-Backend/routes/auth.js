const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const { email, password, name } = require('../middleware/validations');

router.put('/signup', [email, password, name], authController.signup);

module.exports = router;
