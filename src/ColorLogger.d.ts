/**
 * Defines available core logging methods.
 */
interface BasicLogger {
  /**
   * Display fatal (light red) log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  fatal(...msg: any[]): string | undefined;
  /**
   * Display error(red) log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  error(...msg: any[]): string | undefined;
  /**
   * Display warning (yellow) log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  warn(...msg: any[]): string | undefined;
  /**
   * Display info (green) log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  info(...msg: any[]): string | undefined;
  /**
   * Display debug (blue) log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  debug(...msg: any[]): string | undefined;
  /**
   * Display verbose (purple) log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  verbose(...msg: any[]): string | undefined;
  /**
   * Display trace (purple) log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  trace(...msg: any[]): string | undefined;
}
/**
 * Provides an extended set of logging methods to explicitly control options.
 *
 * @example
 * ```js
 * logger.ext.infoNoColor('An info log message with no color');
 * ```
 */
interface ColorLoggerExt {
  /**
   * Display fatal (light red) log; objects compacted.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  fatalCompact(...msg: any[]): string | undefined;
  /**
   * Display fatal log (no color)
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  fatalNoColor(...msg: any[]): string | undefined;
  /**
   * Display raw fatal log (no style / no color).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  fatalRaw(...msg: any[]): string | undefined;
  /**
   * Display fatal log (with time).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  fatalTime(...msg: any[]): string | undefined;
  /**
   * Display error(red) log; objects compacted.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  errorCompact(...msg: any[]): string | undefined;
  /**
   * Display error log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  errorNoColor(...msg: any[]): string | undefined;
  /**
   * Display raw error log (no style / no color).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  errorRaw(...msg: any[]): string | undefined;
  /**
   * Display error log (with time).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  errorTime(...msg: any[]): string | undefined;
  /**
   * Display warning (yellow) log; objects compacted.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  warnCompact(...msg: any[]): string | undefined;
  /**
   * Display warning log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  warnNoColor(...msg: any[]): string | undefined;
  /**
   * Display raw warn log (no style / no color).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  warnRaw(...msg: any[]): string | undefined;
  /**
   * Display warn log (with time).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  warnTime(...msg: any[]): string | undefined;
  /**
   * Display info (green) log; objects compacted.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  infoCompact(...msg: any[]): string | undefined;
  /**
   * Display info log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  infoNoColor(...msg: any[]): string | undefined;
  /**
   * Display raw info log (no style / no color).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  infoRaw(...msg: any[]): string | undefined;
  /**
   * Display info log (with time).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  infoTime(...msg: any[]): string | undefined;
  /**
   * Display debug (blue) log; objects compacted.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  debugCompact(...msg: any[]): string | undefined;
  /**
   * Display debug log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  debugNoColor(...msg: any[]): string | undefined;
  /**
   * Display raw debug log (no style / no color).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  debugRaw(...msg: any[]): string | undefined;
  /**
   * Display debug log (with time).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  debugTime(...msg: any[]): string | undefined;
  /**
   * Display verbose (purple) log; objects compacted.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  verboseCompact(...msg: any[]): string | undefined;
  /**
   * Display verbose log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  verboseNoColor(...msg: any[]): string | undefined;
  /**
   * Display raw verbose log (no style / no color).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  verboseRaw(...msg: any[]): string | undefined;
  /**
   * Display verbose log (with time).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  verboseTime(...msg: any[]): string | undefined;
  /**
   * Display trace (purple) log; objects compacted.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  traceCompact(...msg: any[]): string | undefined;
  /**
   * Display trace log.
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  traceNoColor(...msg: any[]): string | undefined;
  /**
   * Display raw trace log (no style / no color).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  traceRaw(...msg: any[]): string | undefined;
  /**
   * Display trace log (with time).
   *
   * @param msg - log message.
   *
   * @returns Formatted log message or undefined if log level is not enabled.
   */
  traceTime(...msg: any[]): string | undefined;
}
/**
 * Provides the `is` API allowing compact checks for log level conditional statements.
 *
 * @example
 * ```js
 * if (logger.is.verbose) {
 *    // The logger is configured for verbose logging.
 * }
 * ```
 */
interface ColorLoggerIs {
  /**
   * @returns {boolean} Whether `fatal` logging is enabled.
   */
  get fatal(): boolean;
  /**
   * @returns {boolean} Whether `error` logging is enabled.
   */
  get error(): boolean;
  /**
   * @returns {boolean} Whether `warn` logging is enabled.
   */
  get warn(): boolean;
  /**
   * @returns {boolean} Whether `info` logging is enabled.
   */
  get info(): boolean;
  /**
   * @returns {boolean} Whether `debug` logging is enabled.
   */
  get debug(): boolean;
  /**
   * @returns {boolean} Whether `verbose` logging is enabled.
   */
  get verbose(): boolean;
  /**
   * @returns {boolean} Whether `trace` logging is enabled.
   */
  get trace(): boolean;
}

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
 *
 * @implements {import('./types').BasicLogger}
 */
declare class ColorLogger implements BasicLogger {
  /**
   * Instantiates ColorLogger allowing optional options to be set.
   *
   * @param {Partial<ColorLoggerOptions>}   [options] - Optional ColorLoggerOptions to set.
   */
  constructor(options?: Partial<ColorLoggerOptions>);
  /**
   * @returns {import('./types').ColorLoggerExt} Extended logging API.
   */
  get ext(): ColorLoggerExt;
  /**
   * @returns {import('./types').ColorLoggerIs} Is log level accessor API.
   */
  get is(): ColorLoggerIs;
  /**
   * Get the log level string.
   *
   * @returns {LogLevel} Log level string.
   */
  getLogLevel(): LogLevel;
  /**
   * Returns a copy of the logger options.
   *
   * @returns {ColorLoggerOptions} - Logger options.
   */
  getOptions(): ColorLoggerOptions;
  /**
   * Returns whether the given log level is enabled.
   *
   * @param {LogLevel}   level - log level
   *
   * @returns {boolean} True if the log level is enabled.
   */
  isLevelEnabled(level: LogLevel): boolean;
  /**
   * Returns true if the given level is a valid log level.
   *
   * @param {string}   level - The log level string to test.
   *
   * @returns {boolean} True if the given log level provided is valid.
   */
  isValidLevel(level: string): boolean;
  /**
   * Sets the current log level.
   *
   * @param {string}   level - log level
   *
   * @returns {boolean} Whether the log level has been set.
   */
  setLogLevel(level: string): boolean;
  /**
   * Set optional parameters.
   *
   * @param {Partial<ColorLoggerOptions>} options - Defines optional parameters to set.
   */
  setOptions(options?: Partial<ColorLoggerOptions>): void;
  /**
   * Display fatal (light red) log.
   *
   * @param {...*} msg - log message.
   *
   * @returns {string | undefined} Formatted log message or undefined if log level is not enabled.
   */
  fatal(...msg: any[]): string | undefined;
  /**
   * Display error(red) log.
   *
   * @param {...*} msg - log message.
   *
   * @returns {string | undefined} Formatted log message or undefined if log level is not enabled.
   */
  error(...msg: any[]): string | undefined;
  /**
   * Display warning (yellow) log.
   *
   * @param {...*} msg - log message.
   *
   * @returns {string | undefined} Formatted log message or undefined if log level is not enabled.
   */
  warn(...msg: any[]): string | undefined;
  /**
   * Display info (green) log.
   *
   * @param {...*} msg - log message.
   *
   * @returns {string | undefined} Formatted log message or undefined if log level is not enabled.
   */
  info(...msg: any[]): string | undefined;
  /**
   * Display debug (blue) log.
   *
   * @param {...*} msg - log message.
   *
   * @returns {string | undefined} Formatted log message or undefined if log level is not enabled.
   */
  debug(...msg: any[]): string | undefined;
  /**
   * Display verbose (purple) log.
   *
   * @param {...*} msg - log message.
   *
   * @returns {string | undefined} Formatted log message or undefined if log level is not enabled.
   */
  verbose(...msg: any[]): string | undefined;
  /**
   * Display trace (purple) log.
   *
   * @param {...*} msg - log message.
   *
   * @returns {string | undefined} Formatted log message or undefined if log level is not enabled.
   */
  trace(...msg: any[]): string | undefined;
  /**
   * Wires up ColorLogger on the plugin eventbus.
   *
   * @param {object} ev - PluginInvokeEvent - The plugin event.
   *
   * @see https://www.npmjs.com/package/@typhonjs-plugin/manager
   *
   * @ignore
   */
  onPluginLoad(ev: object): void;
  #private;
}
/**
 * The valid
 * log level names.
 */
type LogLevel = 'off' | 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'verbose' | 'trace' | 'all';
/**
 * Provides ColorLoggerOptions
 */
type ColorLoggerOptions = {
  /**
   * If true output to `console.log` is enabled.
   */
  consoleEnabled: boolean;
  /**
   * If true output does not contain ANSI color codes.
   */
  noColor: boolean;
  /**
   * If true the date is added to format results
   */
  showDate: boolean;
  /**
   * If true the location of where the log method is invoked is added to output.
   */
  showInfo: boolean;
  /**
   * If true the log level is prepended to the log output.
   */
  showLevel: boolean;
  /**
   * Custom tag to prepend to log output.
   */
  tag: string;
};

export { ColorLogger };
export type { BasicLogger, ColorLoggerExt, ColorLoggerIs, ColorLoggerOptions, LogLevel };
