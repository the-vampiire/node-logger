const { format } = require("winston");

const printFormat = format.printf((info) => {
  const { timestamp, message, level } = info;
  return `${level} [${timestamp}]: ${JSON.stringify(message)}`;
});

const timestampFormat = format.timestamp({ format: "HH:mm:ss" });

const baseFormat = [timestampFormat, printFormat];

module.exports = {
  file: format.combine(...baseFormat),
  console: format.combine(format.colorize(), ...baseFormat),
};
