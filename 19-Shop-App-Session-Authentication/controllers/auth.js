const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: req.flash('error')
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
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
    });
}

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.redirect('/signup')
    }

    const user = await new User({ email, password, cart: { items: [] } });
    await user.save();

    res.redirect('/login');
}
