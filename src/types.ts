/**
 * Provides an extended set of logging methods to explicitly control options.
 *
 * @example
 * ```js
 * logger.ext.infoNoColor('An info log message with no color');
 * ```
 */
export interface ColorLoggerExt
{
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
 * Provides the `is` API allowing compact checks for log level conditional statements.
 *
 * @example
 * ```js
 * if (logger.is.verbose) {
 *    // The logger is configured for verbose logging.
 * }
 * ```
 */
export interface ColorLoggerIs
{
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
