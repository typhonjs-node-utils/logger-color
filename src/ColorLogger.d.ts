/**
 * Provides an extended set of logging methods to explicitly control options.
 */
interface ColorLoggerExt {
    /**
     * Display fatal (light red) log; objects compacted.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    fatalCompact(...msg: any[]): string;
    /**
     * Display fatal log (no color)
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    fatalNoColor(...msg: any[]): string;
    /**
     * Display raw fatal log (no style / no color).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    fatalRaw(...msg: any[]): string;
    /**
     * Display fatal log (with time).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    fatalTime(...msg: any[]): string;
    /**
     * Display error(red) log; objects compacted.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    errorCompact(...msg: any[]): string;
    /**
     * Display error log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    errorNoColor(...msg: any[]): string;
    /**
     * Display raw error log (no style / no color).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    errorRaw(...msg: any[]): string;
    /**
     * Display error log (with time).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    errorTime(...msg: any[]): string;
    /**
     * Display warning (yellow) log; objects compacted.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    warnCompact(...msg: any[]): string;
    /**
     * Display warning log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    warnNoColor(...msg: any[]): string;
    /**
     * Display raw warn log (no style / no color).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    warnRaw(...msg: any[]): string;
    /**
     * Display warn log (with time).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    warnTime(...msg: any[]): string;
    /**
     * Display info (green) log; objects compacted.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    infoCompact(...msg: any[]): string;
    /**
     * Display info log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    infoNoColor(...msg: any[]): string;
    /**
     * Display raw info log (no style / no color).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    infoRaw(...msg: any[]): string;
    /**
     * Display info log (with time).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    infoTime(...msg: any[]): string;
    /**
     * Display debug (blue) log; objects compacted.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    debugCompact(...msg: any[]): string;
    /**
     * Display debug log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    debugNoColor(...msg: any[]): string;
    /**
     * Display raw debug log (no style / no color).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    debugRaw(...msg: any[]): string;
    /**
     * Display debug log (with time).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    debugTime(...msg: any[]): string;
    /**
     * Display verbose (purple) log; objects compacted.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    verboseCompact(...msg: any[]): string;
    /**
     * Display verbose log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    verboseNoColor(...msg: any[]): string;
    /**
     * Display raw verbose log (no style / no color).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    verboseRaw(...msg: any[]): string;
    /**
     * Display verbose log (with time).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    verboseTime(...msg: any[]): string;
    /**
     * Display trace (purple) log; objects compacted.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    traceCompact(...msg: any[]): string;
    /**
     * Display trace log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    traceNoColor(...msg: any[]): string;
    /**
     * Display raw trace log (no style / no color).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    traceRaw(...msg: any[]): string;
    /**
     * Display trace log (with time).
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    traceTime(...msg: any[]): string;
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
 */
declare class ColorLogger {
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
     * @returns {string} formatted log message.
     */
    fatal(...msg: any[]): string;
    /**
     * Display error(red) log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    error(...msg: any[]): string;
    /**
     * Display warning (yellow) log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    warn(...msg: any[]): string;
    /**
     * Display info (green) log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    info(...msg: any[]): string;
    /**
     * Display debug (blue) log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    debug(...msg: any[]): string;
    /**
     * Display verbose (purple) log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    verbose(...msg: any[]): string;
    /**
     * Display trace (purple) log.
     *
     * @param {...*} msg - log message.
     *
     * @returns {string} formatted log message.
     */
    trace(...msg: any[]): string;
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
    tag: string | undefined;
};

export { ColorLogger, type ColorLoggerExt, type ColorLoggerOptions, type LogLevel };
