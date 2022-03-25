const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(colorize(), timestamp({format: "HH:mm:ss"}), myFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: 'error.log', level: 'debug' }), // to store logs in a file
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;