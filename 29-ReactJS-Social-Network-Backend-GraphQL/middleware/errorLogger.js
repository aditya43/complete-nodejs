const logger = require('../utils/errorLogger');

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    const errorMessage = error.message || JSON.stringify(error);

    logger.error({
        message: '\n\n' + errorMessage,
        error: error || {},
        stack: error.stack || {}
    });

    res.status(500).json({
        code: error.statusCode || 500,
        message: errorMessage
    });

    next();
};
