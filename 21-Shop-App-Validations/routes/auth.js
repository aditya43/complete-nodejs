const express = require('express');
const authController = require('../controllers/auth');
const { check, body } = require('express-validator');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', [check('email').normalizeEmail()], authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);

router.post('/signup', [
    check('email').isEmail()
        .withMessage('Please enter valid email-address.')
        .custom(async (value, { req }) => {
            const existingUser = await User.findOne({ email: value });

            if (existingUser) {
                throw new Error('E-mail address already in use.');
            }

            return true;
        })
        .normalizeEmail(),

    body('password', 'Password must be alphanumeric and at least 3 charachers long.').isLength({ min: 3, max: 20 })
        .isAlphanumeric(),

    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm password must match the entered password.');
        }

        return true;
    })
], authController.postSignup);

router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);
router.get('/new-password/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
