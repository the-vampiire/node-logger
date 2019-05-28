const winston = require("winston");

const { console, rotatingError, rotatingCombined } = require("./transports");

const { format } = winston;

/**
 * pre-configured Winston logger
 *
 * options:
 * - enableFiles: enable writing error and combined log files
 * - errorMaxFiles: max size / days to keep error log files
 * - combinedMaxFiles: max size / days to keep combined log files
 * - enableConsole: enable colorized console
 * - levels: winston logger levels
 * - colors: winston console level colors
 */
module.exports = ({
  enableFiles = process.env.NODE_ENV === "production",
  enableConsole = process.env.NODE_ENV !== "production",
  errorMaxFiles = "14d",
  combinedMaxFiles = "14d",
  levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors = {
    error: "bold red",
    warn: "italic yellow",
    info: "bold white",
    debug: "cyan",
  },
} = {}) => {
  const logger = winston.createLogger({
    levels,
    format: format.combine(format.json(), format.errors({ stack: true })),
  });

  if (enableConsole) {
    logger.level = "debug";
    logger.add(console);
    winston.addColors(colors);
  }

  if (enableFiles) {
    logger
      .add(rotatingError(errorMaxFiles))
      .add(rotatingCombined(combinedMaxFiles));
  }

  return logger;
};
