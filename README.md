# Logger

- see [winston](https://github.com/winstonjs/winston) docs for details on usage
- colorizes console logging
- uses `winston-daily-rotate-file` for rotating error and combined log files

## usage

```sh
$ npm i @vampiire/node-logger
```

```js
const configLogger = require("@vampiire/node-logger");

const logger = configLogger(); // defaults

const logger = configLogger({ ... }); // custom options

// use the logger
stuff.then(logger.info).catch(logger.error); // etc
```

```js
// shorthand
const logger = require('@vampiire/node-logger')(); // default
const logger = require('@vampiire/node-logger')({ ... }); // custom options
```

## logging format

```sh
<log level> [<HH:mm:ss timestamp>] - <JSON stringified message>
```

## env vars

```sh
NODE_ENV=
ERROR_LOGS_DIR=
COMBINED_LOGS_DIR=
```

- `ERROR_LOGS_DIR`: where the error log files will be written. **this directory must exist**
- `COMBINED_LOGS_DIR`: where the combined log files will be written. **this directory must exist**
  - combined logs are written for all logs at or below the `logger.level` configuration
- log files have the name `%DATE%.log` where the date is the current `YYYY-MM-DD` format
  - they are rotated daily (new file each day)
  - the `maxFiles` option is set to 14 days by default

## configuration options & defaults

```js
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
```

- `enableFiles`: adds the rotating file transports for errors and combined
  - `errorMaxFiles`: number of days / size to keep error files before removing
  - `combinedMaxFiles`: number of days / size to keep combined files before removing
  - see [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file) for details
- `enabledConsole`: adds the console transport (colorized)
- `levels`: winston logger levels see [winston levels](https://github.com/winstonjs/winston#logging-levels)
- `colors`: console colorizing options see [winston colors](https://github.com/winstonjs/winston#using-custom-logging-levels)
