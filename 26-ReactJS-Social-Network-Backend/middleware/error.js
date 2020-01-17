const logger = require('./utils/errorLogger');

exports.error = (error, req, res, next) => {
    logger.error({
        message: error.message,
        error: error
    });
    res.status(500).json({
        code: 500,
        message: 'Something went wrong!'
    });
};
