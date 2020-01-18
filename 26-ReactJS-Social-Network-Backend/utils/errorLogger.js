const winston = require('winston');
const { format } = winston;

const logger = winston.createLogger({
    format: format.combine(
        format.errors({ stack: true }),
        format.metadata(),
        format.json()
    ),
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            prettyPrint: false,
            silent: false,
            colorize: true,
            timestamp: true,
            json: false,
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true,
            prettyPrint: true,
            silent: false
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
