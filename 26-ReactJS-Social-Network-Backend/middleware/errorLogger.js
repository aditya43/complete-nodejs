const logger = require('../utils/errorLogger');

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;

    logger.error({
        message: error.message || JSON.stringify(error),
        error: error || {},
        stack: error.stack || {}
    });

    res.status(500).json({
        code: 500,
        message: 'Something went wrong!'
    });
};
