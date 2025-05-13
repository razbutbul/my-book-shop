const winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toLowerCase()}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      customFormat
    ),
  })
);

module.exports = logger;
