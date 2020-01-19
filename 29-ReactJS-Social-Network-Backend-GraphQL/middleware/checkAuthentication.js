const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization').split(' ');

        if (!authHeader.length || authHeader.length < 1) {
            throw new Error('Authorization failed');
        }

        const token = authHeader[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new Error('Not authenticated');
        }

        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
};
