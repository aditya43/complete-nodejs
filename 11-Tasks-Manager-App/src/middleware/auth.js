const auth = async (req, res, next) => {
    console.log('Auth Middleware');

    next();
};

module.exports = auth;
