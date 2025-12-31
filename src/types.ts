/**
 * Defines available core logging methods.
 */
export interface BasicLogger
{
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
export interface ColorLoggerExt
{
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
