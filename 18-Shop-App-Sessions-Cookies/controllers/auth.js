exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isAuthenticated
    });
};

exports.postLogin = async (req, res, next) => {
    res.setHeader('Set-Cookie', 'isAuthenticated=true');
    req.isAuthenticated = true;
    res.send(req.body);
}