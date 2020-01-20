const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader.length || authHeader.length < 1) {
            req.isAuth = false;
            return next();
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            req.isAuth = false;
            return next();
        }

        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        req.isAuth = false;
        return next();
    }
};
