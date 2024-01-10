/**
 * `@typhonjs-utils/logger-color/plugin` defines an instance of {@link ColorLogger} that can be loaded as a plugin via
 * `@typhonjs-plugin/manager` and self-registers on an eventbus with all methods exposed as event bindings.
 *
 * The extended API when using event bindings is accessed by appending `:compact`, `:nocolor`, `:raw`, or `:time`. The
 * no color option outputting the message with the current log format and the raw format will output just the raw
 * message with no format or color applied.
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
 *
 * @module
 */

import * as _typhonjs_utils_logger_color from '@typhonjs-utils/logger-color';

/**
 * A default exported instance of {@link ColorLogger}.
 *
 * @type {import('@typhonjs-utils/logger-color').ColorLogger}
 */
declare const logger: _typhonjs_utils_logger_color.ColorLogger;

export { logger as default };
