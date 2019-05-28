# Logger

- see [winston](https://github.com/winstonjs/winston) docs for details on usage
- colorizes console logging
- uses `winston-daily-rotate-file` for rotating error and combined log files

## usage

```sh
$ npm i @vampiire/node-logger
```

```js
const createLogger = require("@vampiire/node-logger");

const logger = createLogger(); // defaults

const logger = createLogger({ ... }); // custom options
```

```js
// shorthand
const logger = require('@vampiire/node-logger')(); // default
const logger = require('@vampiire/node-logger')({ ... }); // custom options
```

**usage for errors**

- pass the error directly to the `logger.error`

```js
stuff.then().catch(logger.error);

try {
  stuff();
} catch (error) {
  logger.error(error);
}
```

## logging format

```sh
<log level> [<HH:mm:ss timestamp>] - <message>
```

**error format**

```sh
<log level> [<HH:mm:ss timestamp>] - <error.message>
<
  error stack trace
  on new line
>
```

## expected env vars

```sh
NODE_ENV=
ERROR_LOGS_DIR=
COMBINED_LOGS_DIR=
```

- `NODE_ENV`
  - `!== production`: enables console transport, disables file transports
  - `=== production`: disables console transport, enables file transports
  - override this behavior with ` options``.enableConsole `/`.enableFiles`
- the directory paths can be:
  - relative (to the project): `ERROR_LOGS_DIR=logs/errors`
  - absolute (must exist / have permission to write): `ERROR_LOGS_DIR=/Users/username/logs/errors`
- `ERROR_LOGS_DIR`: where the error log files will be written.
- `COMBINED_LOGS_DIR`: where the combined log files will be written.
  - combined logs are written for all logs at or below the `logger.level` configuration
- log files have the name `%DATE%.log` where the date is the current `YYYY-MM-DD` format
  - they are rotated daily (new file each day)
  - the `maxFiles` option is set to 14 days by default (will keep logs up to 14 days before removing)

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
