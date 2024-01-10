/**
 * Provides a color coded logger for ANSI terminal usage. In addition to providing a global scope logger
 * `@typhonjs-utils/logger-color` is optionally plugin enabled via `@typhonjs-plugin/manager` and can self-register on
 * an eventbus with all methods exposed as event bindings.
 *
 * There are several format options to display additional data / info including location where the log method is
 * invoked in addition to a time stamp. By default the time stamp option is disabled.
 *
 * When passing in an Error for logging the stack trace of the error will be used for info and trace creation. The
 * `trace` method will automatically generate a stack trace.
 *
 * format:
 * ``[LogLevel] [Time] [File] log text``
 *
 * Log level and color:
 * - fatal: light red
 * - error: red
 * - warn: yellow
 * - info: green
 * - debug: blue
 * - verbose: purple
 * - trace: light cyan
 *
 * Each log method for the log levels above have alternate versions that are accessed by appending `Compact`,
 * `NoColor` or `Raw` to the method name. Or if using event bindings appending `:compact`, `:nocolor` or `:raw`. The no
 * color option with, well, no color outputting the message with the current log format and the raw format will output
 * just the raw message with no format or color applied.
 *
 * @example
 * import { ColorLogger } from '@typhonjs-utils/logger-color';
 *
 * const logger = new ColorLogger();
 *
 * // simple usage
 * logger.error('An error occurred!');
 *
 * @example
 * import { PluginManager } from '@typhonjs-plugin/manager';
 *
 * const pluginManager = new PluginManager();
 *
 * // This will automatically wire up typhonjs-color-logger to the eventbus.
 * await pluginManager.add({ name: '@typhonjs-utils/logger-color/plugin' });
 *
 * const eventbus = pluginManager.getEventbus();
 *
 * // simple usage
 * eventbus.trigger('log:error', 'An error occurred!');
 *
 * @see https://www.npmjs.com/package/@typhonjs-plugin/manager
 */
export class ColorLogger
{
   /**
    * Instantiates ColorLogger allowing optional options to be set.
    *
    * @param {ColorLoggerOptions}   [options] - Optional ColorLoggerOptions to set.
    */
   constructor(options = {})
   {
      if (typeof options !== 'object') { throw new TypeError(`'options' is not an object.`); }

      /**
       * Stores ColorLogger options.
       *
       * @type {ColorLoggerOptions}
       *
       * @private
       */
      this._options =
      {
         consoleEnabled: true,
         noColor: false,
         showDate: false,
         showInfo: false
      };

      /**
       * Stores the current internal log level.
       *
       * @type {number}
       *
       * @private
       */
      this._logLevel = s_LOG_LEVELS['info'];

      this.setOptions(options);
   }

   /**
    * Get the log level string.
    *
    * @returns {string} Log level string.
    */
   getLogLevel()
   {
      return s_LOG_LEVEL_STRINGS[this._logLevel];
   }

   /**
    * Returns a copy of the logger options.
    *
    * @returns {ColorLoggerOptions} - Logger options.
    */
   getOptions()
   {
      return JSON.parse(JSON.stringify(this._options));
   }

   /**
    * Generates log information from where the logger invocation originated.
    *
    * @param {Error}    error - An optional Error to trace instead of artificially generating one.
    *
    * @returns {{info: string, trace: string}} info: file name and line number; trace: remaining stack trace if enabled.
    */
   _getTraceInfo(error)
   {
      let processError = error;

      if (!(processError instanceof Error))
      {
         try { throw new Error(); }
         catch (err) { processError = err; }
      }

      // Make sure there is a entry in `processError`.
      if (typeof processError.stack === 'string')
      {
         // Attempt to parse error with @typhonjs-utils/error-parser if there is an eventbus assigned.
         if (this._eventbus !== void 0)
         {
            try
            {
               const parsed = this._eventbus.triggerSync('typhonjs:utils:error:parser:filter', { error: processError });

               if (parsed !== void 0)
               {
                  return { info: parsed.firstFilenameLineCol, trace: parsed.toStringTrace() };
               }
            }
            catch (err) { /* noop */ }
         }

         return s_PARSE_STACK_TRACE(processError.stack);
      }

      return { info: 'no stack trace', trace: '' };
   }

   /**
    * Returns whether the given log level is enabled.
    *
    * @param {string}   level - log level
    *
    * @returns {boolean} True if the log level is enabled.
    */
   isLevelEnabled(level)
   {
      const requestedLevel = s_LOG_LEVELS[level];

      if (typeof requestedLevel === 'undefined' || requestedLevel === null)
      {
         console.log(`isLevelEnabled - unknown log level: ${level}`);
         return false;
      }

      return s_IS_LEVEL_ENABLED(this._logLevel, requestedLevel);
   }

   /**
    * Returns true if the given level is a valid log level.
    *
    * @param {string}   level - The log level string to test.
    *
    * @returns {boolean} True if the given log level provided is valid.
    */
   isValidLogLevel(level)
   {
      return typeof level === 'string' && typeof s_LOG_LEVELS[level] === 'number';
   }

   /**
    * Display log message.
    *
    * @param {string}   level - log level: `fatal`, `error`, `warn`, `info`, `debug`, `verbose`, `trace`.
    *
    * @param {boolean}  [compact=false] - If true then all JSON object conversion is compacted.
    *
    * @param {boolean}  [nocolor=false] - If true then no color is applied.
    *
    * @param {boolean}  [raw=false] - If true then just the raw message is logged at the given level.
    *
    * @param {boolean}  [time=false] - If true then message is logged at the given level with a timestamp.
    *
    * @param {...*}     msg - log message.
    *
    * @returns {string|undefined} formatted log message or undefined if log level is not enabled.
    * @private
    */
   _output(level, compact = false, nocolor = false, raw = false, time = false,  ...msg)
   {
      if (!s_IS_LEVEL_ENABLED(this._logLevel, s_LOG_LEVELS[level])) { return; }

      const text = [];

      const isTrace = level === 'trace';

      for (const m of msg)
      {
         if (typeof m === 'object' && !(m instanceof Error))
         {
            text.push(compact ? JSON.stringify(m) : JSON.stringify(m, null, 3));
         }
         else if (m instanceof Error)
         {
            const result = this._getTraceInfo(m);

            text.push(`${m.message}\n${result.trace}`);
         }
         else
         {
            text.push(m);
         }
      }

      const color = this._options.noColor || nocolor ? '' : s_LEVEL_TO_COLOR[level];

      const spacer = raw ? '' : ' ';

      let info = '';
      let trace = '';

      let traceResult = void 0;

      if (this._options.showInfo && !raw && !time)
      {
         const infoSpace = this._options.noColor || nocolor ? '' : ' ';

         traceResult = this._getTraceInfo(void 0);

         info = `${infoSpace}[${traceResult.info}]`;
      }

      if (isTrace)
      {
         if (traceResult === void 0) { traceResult = this._getTraceInfo(void 0); }

         trace = `\n${traceResult.trace}\n`;
      }

      let now = '';

      if (time || (this._options.showDate && !raw))
      {
         const d = new Date();

         let month = d.getMonth() + 1;
         if (month < 10) { month = `0${month}`; }

         let date = d.getDate();
         if (date < 10) { date = `0${date}`; }

         let hour = d.getHours();
         if (hour < 10) { hour = `0${hour}`; }

         let minutes = d.getMinutes();
         if (minutes < 10) { minutes = `0${minutes}`; }

         let sec = d.getSeconds();
         if (sec < 10) { sec = `0${sec}`; }

         now = ` [${d.getFullYear()}-${month}-${date}T${hour}:${minutes}:${sec}.${d.getMilliseconds()}Z]`;
      }

      const log = `${color}${now}${info}${spacer}${text.join('\n')}${trace}[0m`;

      if (this._options.consoleEnabled)
      {
         console.log(log);
      }

      return log;
   }

   /**
    * Sets the current log level.
    *
    * @param {string}   level - log level
    *
    * @returns {boolean} Whether the log level has been set.
    */
   setLogLevel(level)
   {
      const requestedLevel = s_LOG_LEVELS[level];

      if (requestedLevel === void 0 || requestedLevel === null)
      {
         console.log(`@typhonjs-utils/logger-color - setLogLevel - unknown log level: ${level}`);
         return false;
      }

      this._logLevel = requestedLevel;
      return true;
   }

   /**
    * Set optional parameters.
    *
    * @param {ColorLoggerOptions} options - Defines optional parameters to set.
    */
   setOptions(options = {})
   {
      if (typeof options !== 'object') { throw new TypeError(`'options' is not an 'object'.`); }

      if (typeof options.consoleEnabled === 'boolean') { this._options.consoleEnabled = options.consoleEnabled; }
      if (typeof options.noColor === 'boolean') { this._options.noColor = options.noColor; }
      if (typeof options.showDate === 'boolean') { this._options.showDate = options.showDate; }
      if (typeof options.showInfo === 'boolean') { this._options.showInfo = options.showInfo; }
   }

   // Logging methods -----------------------------------------------------------------------------------------------

   /**
    * Display fatal (light red) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   fatal(...msg) { return this._output('fatal', false, false, false, false, ...msg); }

   /**
    * Display fatal (light red) log; objects compacted.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   fatalCompact(...msg) { return this._output('fatal', true, false, false, false, ...msg); }

   /**
    * Display fatal log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   fatalNoColor(...msg) { return this._output('fatal', false, true, false, false, ...msg); }

   /**
    * Display raw fatal log (no style / no color).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   fatalRaw(...msg) { return this._output('fatal', false, true, true, false, ...msg); }

   /**
    * Display fatal log (with time).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   fatalTime(...msg) { return this._output('fatal', false, false, false, true, ...msg); }

   /**
    * Display error(red) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   error(...msg) { return this._output('error', false, false, false, false, ...msg); }

   /**
    * Display error(red) log; objects compacted.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   errorCompact(...msg) { return this._output('error', true, false, false, false, ...msg); }

   /**
    * Display error log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   errorNoColor(...msg) { return this._output('error', false, true, false, false, ...msg); }

   /**
    * Display raw error log (no style / no color).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   errorRaw(...msg) { return this._output('error', false, true, true, false, ...msg); }

   /**
    * Display error log (with time).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   errorTime(...msg) { return this._output('error', false, false, false, true, ...msg); }

   /**
    * Display warning (yellow) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   warn(...msg) { return this._output('warn', false, false, false, false, ...msg); }

   /**
    * Display warning (yellow) log; objects compacted.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   warnCompact(...msg) { return this._output('warn', true, false, false, false, ...msg); }

   /**
    * Display warning log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   warnNoColor(...msg) { return this._output('warn', false, true, false, false, ...msg); }

   /**
    * Display raw warn log (no style / no color).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   warnRaw(...msg) { return this._output('warn', false, true, true, false, ...msg); }

   /**
    * Display warn log (with time).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   warnTime(...msg) { return this._output('warn', false, false, false, true, ...msg); }

   /**
    * Display info (green) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   info(...msg) { return this._output('info', false, false, false, false, ...msg); }

   /**
    * Display info (green) log; objects compacted.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   infoCompact(...msg) { return this._output('info', true, false, false, false, ...msg); }

   /**
    * Display info log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   infoNoColor(...msg) { return this._output('info', false, true, false, false, ...msg); }

   /**
    * Display raw info log (no style / no color).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   infoRaw(...msg) { return this._output('info', false, true, true, false, ...msg); }

   /**
    * Display info log (with time).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   infoTime(...msg) { return this._output('info', false, false, false, true, ...msg); }

   /**
    * Display debug (blue) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   debug(...msg) { return this._output('debug', false, false, false, false, ...msg); }

   /**
    * Display debug (blue) log; objects compacted.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   debugCompact(...msg) { return this._output('debug', true, false, false, false, ...msg); }

   /**
    * Display debug log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   debugNoColor(...msg) { return this._output('debug', false, true, false, false, ...msg); }

   /**
    * Display raw debug log (no style / no color).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   debugRaw(...msg) { return this._output('debug', false, true, true, false, ...msg); }

   /**
    * Display debug log (with time).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   debugTime(...msg) { return this._output('debug', false, false, false, true, ...msg); }

   /**
    * Display verbose (purple) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   verbose(...msg) { return this._output('verbose', false, false, false, false, ...msg); }

   /**
    * Display verbose (purple) log; objects compacted.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   verboseCompact(...msg) { return this._output('verbose', true, false, false, false, ...msg); }

   /**
    * Display verbose log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   verboseNoColor(...msg) { return this._output('verbose', false, true, false, false, ...msg); }

   /**
    * Display raw verbose log (no style / no color).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   verboseRaw(...msg) { return this._output('verbose', false, true, true, false, ...msg); }

   /**
    * Display verbose log (with time).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   verboseTime(...msg) { return this._output('verbose', false, false, false, true, ...msg); }

   /**
    * Display trace (purple) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   trace(...msg) { return this._output('trace', false, false, false, false, ...msg); }

   /**
    * Display trace (purple) log; objects compacted.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   traceCompact(...msg) { return this._output('trace', true, false, false, false, ...msg); }

   /**
    * Display trace log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   traceNoColor(...msg) { return this._output('trace', false, true, false, false, ...msg); }

   /**
    * Display raw trace log (no style / no color).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   traceRaw(...msg) { return this._output('trace', false, true, true, false, ...msg); }

   /**
    * Display trace log (with time).
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   traceTime(...msg) { return this._output('trace', false, false, false, true, ...msg); }

   /**
    * Wires up ColorLogger on the plugin eventbus.
    *
    * @param {object} ev - PluginInvokeEvent - The plugin event.
    *
    * @see https://www.npmjs.com/package/@typhonjs-plugin/manager
    *
    * @ignore
    */
   onPluginLoad(ev)
   {
      this._eventbus = ev.eventbus;

      let eventPrepend = '';

      const options = ev.pluginOptions;

      // Apply any plugin options.
      if (typeof options === 'object')
      {
         this.setOptions(options);

         // If `eventPrepend` is defined then it is prepended before all event bindings.
         if (typeof options.eventPrepend === 'string') { eventPrepend = `${options.eventPrepend}:`; }
      }

      this._eventbus.on(`${eventPrepend}log:fatal`, this.fatal, this);
      this._eventbus.on(`${eventPrepend}log:fatal:compact`, this.fatalCompact, this);
      this._eventbus.on(`${eventPrepend}log:fatal:nocolor`, this.fatalNoColor, this);
      this._eventbus.on(`${eventPrepend}log:fatal:raw`, this.fatalRaw, this);
      this._eventbus.on(`${eventPrepend}log:fatal:time`, this.fatalTime, this);
      this._eventbus.on(`${eventPrepend}log:error`, this.error, this);
      this._eventbus.on(`${eventPrepend}log:error:compact`, this.errorCompact, this);
      this._eventbus.on(`${eventPrepend}log:error:nocolor`, this.errorNoColor, this);
      this._eventbus.on(`${eventPrepend}log:error:raw`, this.errorRaw, this);
      this._eventbus.on(`${eventPrepend}log:error:time`, this.errorTime, this);
      this._eventbus.on(`${eventPrepend}log:warn`, this.warn, this);
      this._eventbus.on(`${eventPrepend}log:warn:compact`, this.warnCompact, this);
      this._eventbus.on(`${eventPrepend}log:warn:nocolor`, this.warnNoColor, this);
      this._eventbus.on(`${eventPrepend}log:warn:raw`, this.warnRaw, this);
      this._eventbus.on(`${eventPrepend}log:warn:time`, this.warnTime, this);
      this._eventbus.on(`${eventPrepend}log:info`, this.info, this);
      this._eventbus.on(`${eventPrepend}log:info:compact`, this.infoCompact, this);
      this._eventbus.on(`${eventPrepend}log:info:nocolor`, this.infoNoColor, this);
      this._eventbus.on(`${eventPrepend}log:info:raw`, this.infoRaw, this);
      this._eventbus.on(`${eventPrepend}log:info:time`, this.infoTime, this);
      this._eventbus.on(`${eventPrepend}log:debug`, this.debug, this);
      this._eventbus.on(`${eventPrepend}log:debug:compact`, this.debugCompact, this);
      this._eventbus.on(`${eventPrepend}log:debug:nocolor`, this.debugNoColor, this);
      this._eventbus.on(`${eventPrepend}log:debug:raw`, this.debugRaw, this);
      this._eventbus.on(`${eventPrepend}log:debug:time`, this.debugTime, this);
      this._eventbus.on(`${eventPrepend}log:verbose`, this.verbose, this);
      this._eventbus.on(`${eventPrepend}log:verbose:compact`, this.verboseCompact, this);
      this._eventbus.on(`${eventPrepend}log:verbose:nocolor`, this.verboseNoColor, this);
      this._eventbus.on(`${eventPrepend}log:verbose:raw`, this.verboseRaw, this);
      this._eventbus.on(`${eventPrepend}log:verbose:time`, this.verboseTime, this);
      this._eventbus.on(`${eventPrepend}log:trace`, this.trace, this);
      this._eventbus.on(`${eventPrepend}log:trace:compact`, this.traceCompact, this);
      this._eventbus.on(`${eventPrepend}log:trace:nocolor`, this.traceNoColor, this);
      this._eventbus.on(`${eventPrepend}log:trace:raw`, this.traceRaw, this);
      this._eventbus.on(`${eventPrepend}log:trace:time`, this.traceTime, this);

      this._eventbus.on(`${eventPrepend}log:level:get`, this.getLogLevel, this);
      this._eventbus.on(`${eventPrepend}log:level:is:enabled`, this.isLevelEnabled, this);
      this._eventbus.on(`${eventPrepend}log:level:is:valid`, this.isValidLogLevel, this);
      this._eventbus.on(`${eventPrepend}log:level:set`, this.setLogLevel, this);
      this._eventbus.on(`${eventPrepend}log:options:get`, this.getOptions, this);
      this._eventbus.on(`${eventPrepend}log:options:set`, this.setOptions, this);
   }
}

/**
 * ASCII ESCAPE SEQUENCE https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 *
 * @type {{n: string, v: string, d: string, i: string, w: string, e: string}}
 */
const s_LEVEL_TO_COLOR =
{
   fatal: '[1;31m[F]', // light red
   error: '[31m[E]',   // red
   warn: '[33m[W]',    // yellow
   info: '[32m[I]',    // green
   debug: '[34m[D]',   // blue
   verbose: '[35m[V]', // purple
   trace: '[1;36m[T]'  // light cyan
};

/**
 * Stores the log level name to level value.
 *
 * @type {{off: number, fatal: number, error: number, warn: number, info: number, verbose: number, debug: number, trace: number, all: number}}
 */
const s_LOG_LEVELS =
{
   off: 8,
   fatal: 7,
   error: 6,
   warn: 5,
   info: 4,
   verbose: 3,
   debug: 2,
   trace: 1,
   all: 0
};

/**
 * Stores the log level name to level value.
 *
 * @type {{"0": string, "1": string, "2": string, "3": string, "4": string, "5": string, "6": string, "7": string, "8": string}}
 */
const s_LOG_LEVEL_STRINGS =
{
   8: 'off',
   7: 'fatal',
   6: 'error',
   5: 'warn',
   4: 'info',
   3: 'verbose',
   2: 'debug',
   1: 'trace',
   0: 'all'
};

/**
 * Validates that the current / requested levels are numbers and that current level is less than requested level.
 *
 * @param {number}   currentLevel - The current ColorLogger level.
 *
 * @param {number}   requestedLevel - The requested level to log.
 *
 * @returns {boolean} True if the requested level is greater than or equal to the current enabled log level.
 */
const s_IS_LEVEL_ENABLED = (currentLevel, requestedLevel) =>
{
   return Number.isInteger(currentLevel) && Number.isInteger(requestedLevel) && currentLevel <= requestedLevel;
};

/**
 * Provides a RegExp to ignore ColorLogger.js for locally processed trace.
 *
 * @type {RegExp}
 */
const s_REGEX_COLOR_LOGGER = /ColorLogger\.js/;

/**
 * Parses a V8 stack trace and pulls out the first file name / line / col not from ColorLogger.js
 *
 * @param {string}   stack - A stack from an Error.
 *
 * @returns {{trace: string, info: string}} The parsed trace.
 */
const s_PARSE_STACK_TRACE = (stack) =>
{
   const lines = stack.split('\n');
   let cntr = 0;

   let info = 'no stack trace';
   const trace = [];

   for (; cntr < lines.length; cntr++)
   {
      if (s_REGEX_COLOR_LOGGER.test(lines[cntr])) { continue; }

      const matched = lines[cntr].match(/([\w\d\-_.]*:\d+:\d+)/);

      if (matched !== null)
      {
         info = matched[1];
         break;
      }
   }

   // If gathering trace info continue to push lines to `trace`. Ignoring any lines that originate from ColorLogger.
   for (; cntr < lines.length; cntr++)
   {
      if (s_REGEX_COLOR_LOGGER.test(lines[cntr])) { continue; }

      trace.push(lines[cntr]);
   }

   return { info, trace: trace.join('\n') };
};

/**
 * Provides ColorLoggerOptions
 *
 * @typedef {object}    ColorLoggerOptions
 *
 * @property {boolean}  [consoleEnabled=true] - If true output to `console.log` is enabled.
 *
 * @property {boolean}  [noColor=false] - If true output does not contain ANSI color codes.
 *
 * @property {boolean}  [showDate=false] - If true the date is added to format results
 *
 * @property {boolean}  [showInfo=true] - If true the location of where the log method is invoked is added to output.
 */
