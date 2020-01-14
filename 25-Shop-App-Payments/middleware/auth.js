module.exports = async (req, res, next) => {
    if (!req.session.isAuthenticated) {
        res.redirect('/login');
    }

    next();
}