const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.session.isAuthenticated;

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = async (req, res, next) => {
    req.session.isAuthenticated = true;
    req.session.user = await User.findOne({ email: 'aditya@hajare.com' });
    await req.session.save();
    res.send(req.body);
}

exports.postLogout = async (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}