const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
}

exports.postLogout = async (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}

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
}

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        req.flash('error', 'E-mail address already in use.');
        return res.redirect('/signup')
    }

    const user = await new User({ email, password, cart: { items: [] } });
    await user.save();

    res.redirect('/login');
}

exports.getResetPassword = async (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/reset', {
        pageTitle: 'Reset Password',
        path: '/reset-password',
        errorMessage: message
    });
}