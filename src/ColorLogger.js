/**
 * Provides a color coded logger for ANSI terminal usage.
 *
 * There are several format options to display additional data / info including location where the log method is
 * invoked in addition to a time stamp. By default, the time stamp option is disabled.
 *
 * When passing in an Error for logging the stack trace of the error will be used for info and trace creation. The
 * `trace` method will automatically generate a stack trace.
 *
 * format:
 * ``[Tag] [LogLevel] [Time] [File] log text``
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
 * Each log method for the log levels above have alternate versions that are accessed via the extended API,
 * {@link ColorLogger.ext}, by appending `Compact`, `NoColor`, `Raw`, or `Time` to the method name.
 *
 * @example
 * import { ColorLogger } from '@typhonjs-utils/logger-color';
 *
 * const logger = new ColorLogger();
 *
 * // simple usage
 * logger.error('An error occurred!');
 */
export class ColorLogger
{
   /**
    * ASCII ESCAPE SEQUENCE https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
    *
    * @type {Record<Partial<LogLevel>, string>}
    */
   static #LEVEL_TO_COLOR = Object.freeze({
      fatal: '[1;31m', // light red
      error: '[31m',   // red
      warn: '[33m',    // yellow
      info: '[32m',    // green
      debug: '[34m',   // blue
      verbose: '[35m', // purple
      trace: '[1;36m'  // light cyan
   });

   /**
    * ASCII ESCAPE SEQUENCE https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
    *
    * @type {Record<Partial<LogLevel>, string>}
    */
   static #LEVEL_TO_TYPE = Object.freeze({
      fatal: '[F]',     // light red
      error: '[E]',     // red
      warn: '[W]',      // yellow
      info: '[I]',      // green
      debug: '[D]',     // blue
      verbose: '[V]',   // purple
      trace: '[T]'      // light cyan
   });

   /**
    * Stores the log level name to level value.
    *
    * @type {Record<LogLevel, number>}
    */
   static #LOG_LEVELS = Object.freeze({
      off: 8,
      fatal: 7,
      error: 6,
      warn: 5,
      info: 4,
      verbose: 3,
      debug: 2,
      trace: 1,
      all: 0
   });

   /**
    * Stores the log level name to level value.
    *
    * @type {Record<string, LogLevel>}
    */
   static #LOG_LEVEL_STRINGS = Object.freeze({
      8: 'off',
      7: 'fatal',
      6: 'error',
      5: 'warn',
      4: 'info',
      3: 'verbose',
      2: 'debug',
      1: 'trace',
      0: 'all'
   });

   /**
    * Provides a RegExp to ignore ColorLogger.js for locally processed trace.
    *
    * @type {RegExp}
    */
   static #REGEX_COLOR_LOGGER = /ColorLogger\.js/;

   /**
    * @type {import('./types').ColorLoggerExt}
    */
   #extAPI;

   /**
    * Stores the current internal log level.
    *
    * @type {number}
    */
   #logLevel;

   /**
    * Stores ColorLogger options.
    *
    * @type {ColorLoggerOptions}
    */
   #options;

   /**
    * Instantiates ColorLogger allowing optional options to be set.
    *
    * @param {Partial<ColorLoggerOptions>}   [options] - Optional ColorLoggerOptions to set.
    */
   constructor(options = {})
   {
      if (typeof options !== 'object') { throw new TypeError(`'options' is not an object.`); }

      this.#options =
      {
         consoleEnabled: true,
         noColor: false,
         showDate: false,
         showInfo: false,
         showLevel: false,
         tag: void 0
      };

      this.#logLevel = ColorLogger.#LOG_LEVELS['info'];

      this.setOptions(options);
   }

   /**
    * Validates that the current / requested levels are numbers and that current level is less than requested level.
    *
    * @param {number}   currentLevel - The current ColorLogger level.
    *
    * @param {number}   requestedLevel - The requested level to log.
    *
    * @returns {boolean} True if the requested level is greater than or equal to the current enabled log level.
    */
   static #IS_LEVEL_ENABLED(currentLevel, requestedLevel)
   {
      return Number.isInteger(currentLevel) && Number.isInteger(requestedLevel) && currentLevel <= requestedLevel;
   }

   /**
    * Parses a V8 stack trace and pulls out the first file name / line / col not from ColorLogger.js
    *
    * @param {string}   stack - A stack from an Error.
    *
    * @returns {{trace: string, info: string}} The parsed trace.
    */
   static #PARSE_STACK_TRACE(stack)
   {
      const lines = stack.split('\n');
      let cntr = 0;

      let info = 'no stack trace';
      const trace = [];

      for (; cntr < lines.length; cntr++)
      {
         if (ColorLogger.#REGEX_COLOR_LOGGER.test(lines[cntr])) { continue; }

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
         if (ColorLogger.#REGEX_COLOR_LOGGER.test(lines[cntr])) { continue; }

         trace.push(lines[cntr]);
      }

      return { info, trace: trace.join('\n') };
   }

   /**
    * @returns {import('./types').ColorLoggerExt} Extended logging API.
    */
   get ext()
   {
      if (!this.#extAPI)
      {
         /** @type {import('./types').ColorLoggerExt} */
         this.#extAPI = Object.freeze({
            fatalCompact: (...msg) => this.#output('fatal', true, false, false, false, ...msg),
            fatalNoColor: (...msg) => this.#output('fatal', false, true, false, false, ...msg),
            fatalRaw: (...msg) => this.#output('fatal', false, true, true, false, ...msg),
            fatalTime: (...msg) => this.#output('fatal', false, false, false, true, ...msg),
            errorCompact: (...msg) => this.#output('error', true, false, false, false, ...msg),
            errorNoColor: (...msg) => this.#output('error', false, true, false, false, ...msg),
            errorRaw: (...msg) => this.#output('error', false, true, true, false, ...msg),
            errorTime: (...msg) => this.#output('error', false, false, false, true, ...msg),
            warnCompact: (...msg) => this.#output('warn', true, false, false, false, ...msg),
            warnNoColor: (...msg) => this.#output('warn', false, true, false, false, ...msg),
            warnRaw: (...msg) => this.#output('warn', false, true, true, false, ...msg),
            warnTime: (...msg) => this.#output('warn', false, false, false, true, ...msg),
            infoCompact: (...msg) => this.#output('info', true, false, false, false, ...msg),
            infoNoColor: (...msg) => this.#output('info', false, true, false, false, ...msg),
            infoRaw: (...msg) => this.#output('info', false, true, true, false, ...msg),
            infoTime: (...msg) => this.#output('info', false, false, false, true, ...msg),
            debugCompact: (...msg) => this.#output('debug', true, false, false, false, ...msg),
            debugNoColor: (...msg) => this.#output('debug', false, true, false, false, ...msg),
            debugRaw: (...msg) => this.#output('debug', false, true, true, false, ...msg),
            debugTime: (...msg) => this.#output('debug', false, false, false, true, ...msg),
            verboseCompact: (...msg) => this.#output('verbose', true, false, false, false, ...msg),
            verboseNoColor: (...msg) => this.#output('verbose', false, true, false, false, ...msg),
            verboseRaw: (...msg) => this.#output('verbose', false, true, true, false, ...msg),
            verboseTime: (...msg) => this.#output('verbose', false, false, false, true, ...msg),
            traceCompact: (...msg) => this.#output('trace', true, false, false, false, ...msg),
            traceNoColor: (...msg) => this.#output('trace', false, true, false, false, ...msg),
            traceRaw: (...msg) => this.#output('trace', false, true, true, false, ...msg),
            traceTime: (...msg) => this.#output('trace', false, false, false, true, ...msg)
         });
      }

      return this.#extAPI;
   }

   /**
    * Get the log level string.
    *
    * @returns {LogLevel} Log level string.
    */
   getLogLevel()
   {
      return ColorLogger.#LOG_LEVEL_STRINGS[this.#logLevel];
   }

   /**
    * Returns a copy of the logger options.
    *
    * @returns {ColorLoggerOptions} - Logger options.
    */
   getOptions()
   {
      return JSON.parse(JSON.stringify(this.#options));
   }

   /**
    * Generates log information from where the logger invocation originated.
    *
    * @param {Error}    error - An optional Error to trace instead of artificially generating one.
    *
    * @returns {{info: string, trace: string}} info: file name and line number; trace: remaining stack trace if enabled.
    */
   #getTraceInfo(error)
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

         return ColorLogger.#PARSE_STACK_TRACE(processError.stack);
      }

      return { info: 'no stack trace', trace: '' };
   }

   /**
    * Returns whether the given log level is enabled.
    *
    * @param {LogLevel}   level - log level
    *
    * @returns {boolean} True if the log level is enabled.
    */
   isLevelEnabled(level)
   {
      const requestedLevel = ColorLogger.#LOG_LEVELS[level];

      if (typeof requestedLevel === 'undefined' || requestedLevel === null)
      {
         console.log(`isLevelEnabled - unknown log level: ${level}`);
         return false;
      }

      return ColorLogger.#IS_LEVEL_ENABLED(this.#logLevel, requestedLevel);
   }

   /**
    * Returns true if the given level is a valid log level.
    *
    * @param {string}   level - The log level string to test.
    *
    * @returns {boolean} True if the given log level provided is valid.
    */
   isValidLevel(level)
   {
      return typeof level === 'string' && typeof ColorLogger.#LOG_LEVELS[level] === 'number';
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
   #output(level, compact = false, nocolor = false, raw = false, time = false,  ...msg)
   {
      if (!ColorLogger.#IS_LEVEL_ENABLED(this.#logLevel, ColorLogger.#LOG_LEVELS[level])) { return; }

      const text = [];

      const isTrace = level === 'trace';

      if (!raw)
      {
         for (const m of msg)
         {
            if (typeof m === 'object' && !(m instanceof Error))
            {
               text.push(compact ? JSON.stringify(m) : JSON.stringify(m, null, 3));
            }
            else if (m instanceof Error)
            {
               const result = this.#getTraceInfo(m);

               text.push(`${m.message}\n${result.trace}`);
            }
            else
            {
               text.push(m);
            }
         }
      }

      const color = this.#options.noColor || nocolor ? '' : ColorLogger.#LEVEL_TO_COLOR[level];

      let info = '';
      let trace = '';

      let traceResult = void 0;

      if (this.#options.showInfo && !raw)
      {
         traceResult = this.#getTraceInfo(void 0);

         info = `[${traceResult.info}] `;
      }

      if (isTrace)
      {
         if (traceResult === void 0) { traceResult = this.#getTraceInfo(void 0); }

         trace = `\n${traceResult.trace}\n`;
      }

      let now = '';

      if (time || (this.#options.showDate && !raw))
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

         now = `[${d.getFullYear()}-${month}-${date}T${hour}:${minutes}:${sec}.${d.getMilliseconds()}Z] `;
      }

      let levelTag = '';
      let tag = '';

      if (!raw)
      {
         if (typeof this.#options.tag === 'string' && this.#options.tag !== '') { tag = `[${this.#options.tag}] `; }

         if (this.#options.showLevel) { levelTag = `${ColorLogger.#LEVEL_TO_TYPE[level]} `; }
      }

      const log = `${color}${tag}${levelTag}${now}${info}${text.join('\n')}${trace}[0m`;

      if (this.#options.consoleEnabled)
      {
         if (raw)
         {
            console.log(...msg);
         }
         else
         {
            console.log(log);
         }
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
      const requestedLevel = ColorLogger.#LOG_LEVELS[level];

      if (requestedLevel === void 0 || requestedLevel === null)
      {
         console.log(`@typhonjs-utils/logger-color - setLogLevel - unknown log level: ${level}`);
         return false;
      }

      this.#logLevel = requestedLevel;
      return true;
   }

   /**
    * Set optional parameters.
    *
    * @param {Partial<ColorLoggerOptions>} options - Defines optional parameters to set.
    */
   setOptions(options = {})
   {
      if (typeof options !== 'object') { throw new TypeError(`'options' is not an 'object'.`); }

      if (typeof options.consoleEnabled === 'boolean') { this.#options.consoleEnabled = options.consoleEnabled; }
      if (typeof options.noColor === 'boolean') { this.#options.noColor = options.noColor; }
      if (typeof options.showDate === 'boolean') { this.#options.showDate = options.showDate; }
      if (typeof options.showInfo === 'boolean') { this.#options.showInfo = options.showInfo; }
      if (typeof options.showLevel === 'boolean') { this.#options.showLevel = options.showLevel; }
      if (typeof options.tag === 'string') { this.#options.tag = options.tag; }
   }

   // Logging methods -----------------------------------------------------------------------------------------------

   /**
    * Display fatal (light red) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   fatal(...msg) { return this.#output('fatal', false, false, false, false, ...msg); }

   /**
    * Display error(red) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   error(...msg) { return this.#output('error', false, false, false, false, ...msg); }

   /**
    * Display warning (yellow) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   warn(...msg) { return this.#output('warn', false, false, false, false, ...msg); }

   /**
    * Display info (green) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   info(...msg) { return this.#output('info', false, false, false, false, ...msg); }

   /**
    * Display debug (blue) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   debug(...msg) { return this.#output('debug', false, false, false, false, ...msg); }

   /**
    * Display verbose (purple) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   verbose(...msg) { return this.#output('verbose', false, false, false, false, ...msg); }

   /**
    * Display trace (purple) log.
    *
    * @param {...*} msg - log message.
    *
    * @returns {string} formatted log message.
    */
   trace(...msg) { return this.#output('trace', false, false, false, false, ...msg); }

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
      /**
       * @internal
       */
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
      this._eventbus.on(`${eventPrepend}log:fatal:compact`, this.ext.fatalCompact, this);
      this._eventbus.on(`${eventPrepend}log:fatal:nocolor`, this.ext.fatalNoColor, this);
      this._eventbus.on(`${eventPrepend}log:fatal:raw`, this.ext.fatalRaw, this);
      this._eventbus.on(`${eventPrepend}log:fatal:time`, this.ext.fatalTime, this);
      this._eventbus.on(`${eventPrepend}log:error`, this.error, this);
      this._eventbus.on(`${eventPrepend}log:error:compact`, this.ext.errorCompact, this);
      this._eventbus.on(`${eventPrepend}log:error:nocolor`, this.ext.errorNoColor, this);
      this._eventbus.on(`${eventPrepend}log:error:raw`, this.ext.errorRaw, this);
      this._eventbus.on(`${eventPrepend}log:error:time`, this.ext.errorTime, this);
      this._eventbus.on(`${eventPrepend}log:warn`, this.warn, this);
      this._eventbus.on(`${eventPrepend}log:warn:compact`, this.ext.warnCompact, this);
      this._eventbus.on(`${eventPrepend}log:warn:nocolor`, this.ext.warnNoColor, this);
      this._eventbus.on(`${eventPrepend}log:warn:raw`, this.ext.warnRaw, this);
      this._eventbus.on(`${eventPrepend}log:warn:time`, this.ext.warnTime, this);
      this._eventbus.on(`${eventPrepend}log:info`, this.info, this);
      this._eventbus.on(`${eventPrepend}log:info:compact`, this.ext.infoCompact, this);
      this._eventbus.on(`${eventPrepend}log:info:nocolor`, this.ext.infoNoColor, this);
      this._eventbus.on(`${eventPrepend}log:info:raw`, this.ext.infoRaw, this);
      this._eventbus.on(`${eventPrepend}log:info:time`, this.ext.infoTime, this);
      this._eventbus.on(`${eventPrepend}log:debug`, this.debug, this);
      this._eventbus.on(`${eventPrepend}log:debug:compact`, this.ext.debugCompact, this);
      this._eventbus.on(`${eventPrepend}log:debug:nocolor`, this.ext.debugNoColor, this);
      this._eventbus.on(`${eventPrepend}log:debug:raw`, this.ext.debugRaw, this);
      this._eventbus.on(`${eventPrepend}log:debug:time`, this.ext.debugTime, this);
      this._eventbus.on(`${eventPrepend}log:verbose`, this.verbose, this);
      this._eventbus.on(`${eventPrepend}log:verbose:compact`, this.ext.verboseCompact, this);
      this._eventbus.on(`${eventPrepend}log:verbose:nocolor`, this.ext.verboseNoColor, this);
      this._eventbus.on(`${eventPrepend}log:verbose:raw`, this.ext.verboseRaw, this);
      this._eventbus.on(`${eventPrepend}log:verbose:time`, this.ext.verboseTime, this);
      this._eventbus.on(`${eventPrepend}log:trace`, this.trace, this);
      this._eventbus.on(`${eventPrepend}log:trace:compact`, this.ext.traceCompact, this);
      this._eventbus.on(`${eventPrepend}log:trace:nocolor`, this.ext.traceNoColor, this);
      this._eventbus.on(`${eventPrepend}log:trace:raw`, this.ext.traceRaw, this);
      this._eventbus.on(`${eventPrepend}log:trace:time`, this.ext.traceTime, this);

      this._eventbus.on(`${eventPrepend}log:level:get`, this.getLogLevel, this);
      this._eventbus.on(`${eventPrepend}log:level:is:enabled`, this.isLevelEnabled, this);
      this._eventbus.on(`${eventPrepend}log:level:is:valid`, this.isValidLogLevel, this);
      this._eventbus.on(`${eventPrepend}log:level:set`, this.setLogLevel, this);
      this._eventbus.on(`${eventPrepend}log:options:get`, this.getOptions, this);
      this._eventbus.on(`${eventPrepend}log:options:set`, this.setOptions, this);
   }
}

/**
 * @typedef {'off' | 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'verbose' | 'trace' | 'all'} LogLevel The valid
 * log level names.
 */

/**
 * @typedef {object}    ColorLoggerOptions Provides ColorLoggerOptions
 *
 * @property {boolean}  consoleEnabled If true output to `console.log` is enabled.
 *
 * @property {boolean}  noColor If true output does not contain ANSI color codes.
 *
 * @property {boolean}  showDate If true the date is added to format results
 *
 * @property {boolean}  showInfo If true the location of where the log method is invoked is added to output.
 *
 * @property {boolean}  showLevel If true the log level is prepended to the log output.
 *
 * @property {string|undefined}  tag Custom tag to prepend to log output.
 */
