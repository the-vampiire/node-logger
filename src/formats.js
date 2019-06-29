const { format } = require("winston");

const printFormat = format.printf(info => {
  const { timestamp, message, level, stack, ...extra } = info;
  let log = `${level} [${timestamp}]: ${message}`;

  if (extra.constructor === Object && Object.keys(extra).length !== 0) {
    log += `\n${JSON.stringify(extra, null, 2)}`;
  }

  return stack ? `${log}\n${stack}` : log;
});

const timestampFormat = format.timestamp({ format: "MM-DD HH:mm:ss" });

const baseFormat = [timestampFormat, printFormat];

module.exports = {
  file: format.combine(...baseFormat),
  console: format.combine(format.colorize(), ...baseFormat),
};
