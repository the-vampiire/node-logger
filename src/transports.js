const { transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const formats = require("./formats");

const console = new transports.Console({ format: formats.console });

const rotatingFileConfig = {
  format: formats.file,
  filename: "%DATE%.log",
};

const rotatingError = maxFiles =>
  new DailyRotateFile({
    ...rotatingFileConfig,
    maxFiles,
    level: "error",
    dirname: process.env.ERROR_LOGS_DIR,
  });

const rotatingCombined = (maxFiles, level) =>
  new DailyRotateFile({
    ...rotatingFileConfig,
    level,
    maxFiles,
    dirname: process.env.COMBINED_LOGS_DIR,
  });

module.exports = {
  console,
  rotatingError,
  rotatingCombined,
};
