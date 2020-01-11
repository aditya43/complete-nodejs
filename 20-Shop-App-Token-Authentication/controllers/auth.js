const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { resetPasswordMail } = require('../emails/account');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: message
    });
};

exports.postLogin = async (req, res, next) => {
    const password = req.body.password;
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
    }

    req.session.user = user;
    req.session.isAuthenticated = true;

    await req.session.save();
    res.redirect('/');
};

exports.postLogout = async (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignup = async (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        errorMessage: message
    });
};

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        req.flash('error', 'E-mail address already in use.');
        return res.redirect('/signup');
    }

    const user = await new User({ email, password, cart: { items: [] } });
    await user.save();

    res.redirect('/login');
};

exports.getResetPassword = async (req, res, next) => {
    let errMessage = req.flash('error');
    let successMessage = req.flash('success');

    if (errMessage.length > 0) {
        errMessage = errMessage[0];
    } else {
        errMessage = null;
    }

    if (successMessage.length > 0) {
        successMessage = successMessage[0];
    } else {
        successMessage = null;
    }

    res.render('auth/reset', {
        pageTitle: 'Reset Password',
        path: '/reset-password',
        errorMessage: errMessage,
        successMessage: successMessage
    });
};

exports.postResetPassword = async (req, res, next) => {
    try {
        const buffer = await crypto.randomBytes(32);
        const token = buffer.toString('hex'); // To convert hexadecimal values to ASCII characters.
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            req.flash('error', 'User account not found.');
            return res.redirect('/reset-password');
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

        resetPasswordMail(req.body.email, token);

        await user.save();

        req.flash('success', 'Reset password link has been sent to your email.');
        res.redirect('/reset-password');
    } catch (e) {
        console.log(e);
        res.redirect('/reset-password');
    }
};
