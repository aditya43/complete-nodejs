const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};

exports.postLogin = async (req, res, next) => {
    req.session.isAuthenticated = true;
    req.session.user = await User.findOne({ email: 'aditya@hajare.com' });
    await req.session.save();
    // res.send(req.body);
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
        isAuthenticated: false
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