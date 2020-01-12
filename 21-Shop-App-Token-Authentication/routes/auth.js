const express = require('express');
const authController = require('../controllers/auth');
const { check } = require('express-validator');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);

router.post('/signup', check('email').isEmail().withMessage('Please enter valid email-address.').custom((value, { req }) => {
    if (value === 'aditya@hajare.com') {
        throw new Error('This email-address is forbidden.');
    }
    return true;
}), authController.postSignup);

router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);
router.get('/new-password/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
