const winston = require("winston");

const { console, rotatingError, rotatingCombined } = require("./transports");

module.exports = (options = {}) => {
  const {
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
  } = options;

  const logger = winston.createLogger({ levels });

  if (enableConsole) {
    logger.level = "debug";
    logger.add(console);
    winston.addColors(colors);
  }

  if (enableFiles) {
    logger.add(rotatingError(errorMaxFiles)).add(rotatingCombined(combinedMaxFiles));
  }
};
