const { format } = require("winston");

const printFormat = format.printf(info => {
  const { timestamp, message, level, stack } = info;
  const base = `${level} [${timestamp}]: ${message}`;

  return stack ? `${base}\n${stack}` : base;
});

const timestampFormat = format.timestamp({ format: "HH:mm:ss" });

const baseFormat = [timestampFormat, printFormat];

module.exports = {
  file: format.combine(...baseFormat),
  console: format.combine(format.colorize(), ...baseFormat),
};
