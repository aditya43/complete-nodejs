const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

// app.use(require('morgan')('combined', { stream: logger.stream }));

module.exports = logger;
